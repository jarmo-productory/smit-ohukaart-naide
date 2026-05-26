# Foto-maskeerimise tehnoloogia valik Ohukaart äpile

**Date:** 2026-05-26  
**Context:** Ohukaart sprint 02 (`sprint-02-fotoga-teavitus` — foto isikuandmete maskimise pipeline)  
**Problem:** Vali tehnoloogia, mis (a) maskib näod ja autonumbrid vaikimisi, (b) sobib Eesti GDPR-konteksti, (c) saavutab vastuvõetava jõudluse (eesmärk: < 2s ack koos maskimisega)

## Executive Summary

H1 nõue „näod ja autonumbrid maskitakse vaikimisi“ on sidusrühmade intervjuudes kinnitatud ([dispetšer](docs/background-research/intervjuu-paastedispetser.md)), kuid autonumbri operatiivne väärtus on vastuolus privaatsusega. Pilveteenused (Google Vision, Azure Face, AWS Rekognition) skaleeruvad hästi, kuid nõuavad pildi üleslaadimist ja andmete asukoha/DPA otsuseid; Google Visioni näotuvastusel **ei ole** dokumenteeritud EU-only endpointi ([release notes](https://cloud.google.com/vision/docs/release-notes)). **Soovitus:** seadmesisene pipeline — **Google ML Kit näotuvastus + YOLOv8n (TFLite/CoreML) numbriplaadid + OpenCV hägustus** — enne ühtegi võrgupäringut; kuni 3 pilti töödeldakse sünkroonselt enne saatmist ([F-02](docs/background-research/112-nouded.md)). Järgmised sammud: sprint-02 spec-is fikseerida autonumbri erand, reversiibiliteet ja minimaalne täpsus; teha lühike PoC vanematel Android/iOS seadmetel.

## Variandid

| Variant | Tüüp | Andmete asukoht | Jõudlus (ligi) | Hind | GDPR-mõju |
| --- | --- | --- | --- | --- | --- |
| Google Cloud Vision API | Cloud API | Näod: globaalne API; OCR/Label/SafeSearch: `eu-vision.googleapis.com` ([release notes](https://cloud.google.com/vision/docs/release-notes)) | Latentsus sõltub võrgust; **konkreetset SLA-d ei leitud** — vajab PoC | Näod: $1,50 / 1000 pärast tasuta 1000/kuu ([hinnakiri](https://cloud.google.com/vision/pricing)); mitu feature’it = mitu arveldust | DPA + pildi edastus töötlejale; näoandmed võivad väljaspool EL-i töödelduda |
| Azure Face API | Cloud API | Ressurss EU regioonis (nt West/North Europe); EU Data Boundary ([Learn](https://learn.microsoft.com/en-us/privacy/eudb/eudb-learn)) | Face Detection ~10 TPS Standard tier ([pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/face-api/)); **ühe pildi latentsus PoC-ga** | ~$1 / 1000 transaction (0–1M) ([pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/face-api/)); Identify/Verify nõuab Limited Access ([Learn](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/computer-vision/limited-access-identity)) | DPA; **autonumbreid Face API ei tuvasta** — vaja eraldi Computer Vision Read |
| AWS Rekognition | Cloud API | Kliendi valitud regioon, sh EU (Ireland, Frankfurt, London) ([pricing regions](https://www.saisci.com/aws/amazon-rekognition-aws-pricing-api-all-attribute-names-and-values/); [EU data protection](https://aws.amazon.com/compliance/eu-data-protection/)) | TPS skaleeritav; AWS soovitab vastuse jaotamist 5–15 s aknas koormusel ([limits](https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/doc_source/limits.md)) | Pay-per-image; DetectFaces + DetectText = 2× arveldus ([pricing](https://aws.amazon.com/rekognition/pricing/)) | DPA; pilt läheb AWS-i; kolmanda riigi ülekande hindamine vajalik |
| OpenCV + Haar Cascades (lokaalne) | On-device | Seadmes | ~71 ms (Snapdragon 845, 256×256 test) kuni ~400 ms (vanem SD800) ([arxiv](https://arxiv.org/pdf/2205.05572)); sõltub resolutsioonist | Tasuta (OpenCV) | Pilt ei lahku seadmest vaikimisi |
| MediaPipe Face Mesh / Face Detection | On-device | Seadmes | Face Detection: ~0,35–0,9 ms (NPU benchmark) kuni ~20–35 ms praktikas ([Qualcomm README](https://huggingface.co/qualcomm/MediaPipe-Face-Detection/blob/0dd669a326ec24a884e51b82741997299d937705/README.md); [võrdlus](https://www.mintlify.com/shubham0204/OnDevice-Face-Recognition-Android/advanced/face-detector-options)); Mesh on ülemäärane lihtsa blur-kasti jaoks | Tasuta | Pilt ei lahku seadmest; **ei tuvasta numbreid** |
| Lokaalne ML mudel (nt YOLOv8 fine-tuned) | On-device | Seadmes | YOLOv8n plaadid: ~30–36 FPS (uuring, mitte kõik mobiilid) ([ETASR](https://www.etasr.com/index.php/ETASR/article/download/9983/4821/46744)); ühendatud nägu+plaat ~25 FPS (GPU, mitte telefon) ([PrivacyGuard raport](https://cs231n.stanford.edu/2025/papers/text_file_840595592-cs231n_final_report.pdf)) | Mudeli arendus/hosting tasuta; INT8 TFLite vähendab mahtu ([Ultralytics Flutter](https://github.com/ultralytics/yolo-flutter-app/tree/0114000f62d465691b98206e35ab30a17f2056fc)) | Täielik lokaalne töötlus; parim vastavus „vaikimisi mask“ + autonumber |

## Eesti kontekst — andmete asukoht ja GDPR

GDPR ei keela isikuandmete töötlemist väljaspool EL-i automaatselt, kuid avaliku sektori kontekstis on praktikas oluline **töötlemise asukoht, DPA ja ISKE turvaklass** ([Riigipilv / ISKE](https://riigipilv.ee/riigipilvest/riigipilvest-kkk/riigipilve-kasutegurid); [turvameetmete määrus](https://www.riigiteataja.ee/redaktsioonide_vordlus.html?grupiId=317423&vasakAktId=115092020015)). Pilvepildi saatmine USA-sse või globaalsesse teenusesse on **võimalik lepinguliselt** (nt AWS EU regioon + DPA ([AWS EU data protection](https://aws.amazon.com/compliance/eu-data-protection/))), kuid **ei ole vaikimisi soovitatav** tundlike teavituspiltide jaoks, eriti kui maskimine saab toimuda seadmes ([ML Kit: on-device](https://developers.google.com/ml-kit/vision/face-detection)). Eesti riigipilv on riigiasutustele eelistatud infrastruktuur ([riigipilv.ee](https://riigipilv.ee/en)); Ohukaardi mobiilne maskimine vähendab vajadust saata töötlemata biomeetrilist/identifitseerivat pildimaterjali pilve.

## Jõudlus — vastuvõetav < 2s ack-i kontekstis

Eesmärk „< 2 s ack koos maskimisega“ tähendab: kasutaja vajutab saada → **kõik kohustuslikud maskimised lõpetatud** → server kinnitab vastuvõtu (F-04). Repo nõuab kuni **3 pilti** teavituse kohta ([F-02](docs/background-research/112-nouded.md)); dispetšer ootab, et pärast 30 s ootamist „midagi on katki“ ([intervjuu](docs/background-research/intervjuu-paastedispetser.md)) — 2 s on seega range, kuid realistlik **ainult on-device** teel. Soovituslik töövoog: pildistamine → kohe resize (nt max 1280 px serv) → sünkroonne tuvastus+blur iga pildi kohta järjest (mitte batch serveris) → alles siis TLS-üleslaadimine. ML Kit + üks YOLOv8n inferents ~20–200 ms sõltuvalt seadmest ([arxiv Haar/YOLO võrdlus](https://arxiv.org/pdf/2205.05572); [ML Kit juhend](https://developers.google.com/ml-kit/vision/face-detection/android)) jätab võrgu RTT-le (sh aeglane võrk NF-03) rohkem ruumi. Pilvevariant lisab üleslaadimise + API RTT — **2 s täitmist ei saa garanteerida ilma mõõtmiseta** (Lahtine küsimus: PoC mõõdikud).

## Erisus: autonumbrid (H1 vastuolu)

Dispetšer soovib vaikimisi maskimist, kuid tunnistab, et **autonumber võib olla otsitavuse seisukohalt kriitiline** (nt hüljesõiduk) ([intervjuu-paastedispetser](docs/background-research/intervjuu-paastedispetser.md)). Tehnoloogia mõju: **näod** on hästi kaetud ML Kit / MediaPipe / DetectFaces API-dega; **numbrid** vajavad eraldi tuvastust (YOLO plaadimudel või Rekognition/Vision **DetectText** — viimased ei pruugi eristada „numbrimärki“ muust tekstist ([Rekognition FAQ](https://aws.amazon.com/rekognition/faqs/))). On-device YOLOv8 võimaldab ühtse bounding-box’i blur’i; pilv võimaldab hilisemat OCR-i, mis **vastuolus vaikimisi maskimisega**, kui OCR käivitub enne blur’i. Autonumbri erand (dispetšeri taotlusel nähtav number) on **äriotsus**, mitte tehniline vaike — vajab sprint-02 spec-i.

## Soovitus

**Variant: seadmesisene ML Kit (näod) + YOLOv8n TFLite/CoreML (autonumbrid) + OpenCV Gaussian blur/pixelation**

Põhjendus (3–5 punkti):

- **Vaikimisi privaatsus:** ML Kit töötleb näod seadmes, ei tee näotuvastust (identiteedi tundmine) ([ML Kit](https://developers.google.com/ml-kit/vision/face-detection)); töötlemata pilt ei pea enne maskimist serverisse minema.
- **Mõlemad H1 objektid:** YOLOv8 on praktikas kasutusel nii nägude kui numbriplaatide jaoks ([PrivacyGuard](https://github.com/laythayache/PrivacyGuard); [DSGVO-Pixeler](https://github.com/LinuxLinusDE/DSGVO-Pixeler/)); ühe mudeliga (2 klassi) lihtsustab hooldust.
- **GDPR / Eesti avalik sektor:** Minimeerib isikuandmete edastust ja kolmanda riigi pilve sõltuvust; ühildub NF-05 ja intervjuu „isikuandmed pildil“ probleemiga ([112-nouded](docs/background-research/112-nouded.md)).
- **< 2 s ack realistlikum:** Näotuvastus + blur on mõõdetav ms–100 ms+ skaalas ühel pildil ([MediaPipe benchmark](https://huggingface.co/qualcomm/MediaPipe-Face-Detection/blob/0dd669a326ec24a884e51b82741997299d937705/README.md)); 3 pilti jääb tüüpiliselt alla 2 s keskklassi telefonil, kui resolutsiooni piirata.
- **Aeglane võrk:** Maskimine ei sõltu võrgust; üles laetakse juba anonümiseeritud fail ([NF-03](docs/background-research/112-nouded.md) kontekst).

**Alternatiivne plaan:** kui on-device täpsus (väikesed näod, kaugplaadid) ei ole piisav PoC-s, kasutada **AWS Rekognition EU (Ireland)** või **Azure Computer Vision (North/West Europe)** ainult **tuvastuse** jaoks, blur ikkagi kliendis või proxys pärast bounding-box’e tagastamist — tingimusel, et DPA, andmete asukoht ja DPIA on kinnitatud. Google Vision näod + `eu-vision` OCR on teisejärguline valik, sest näotuvastusel puudub EU-only garantii ([release notes](https://cloud.google.com/vision/docs/release-notes)). Kui mudelid on liiga rasked, fallback: **ML Kit näod + kasutaja käsitsi täiendav blur** (Signal-i praktika, [Fritz.ai](https://fritz.ai/automatically-pixelate-faces-on-ios-using-native-swift-code-for-face-detection/)).

## Lahtised küsimused (sprintide jaoks)

| Küsimus | Kellelt küsida | Sprintile |
| --- | --- | --- |
| Kas Eesti riigi andmete-asukoha juhend lubab AWS Iiri? | Andmekaitsespetsialist | sprint-02 |
| Kas autonumber-maskimine peab olema reversiibel? | Operatiivjuht + andmekaitse | sprint-02 |
| Kas H1 „F-03 maskimine“ kaardistub NF-05 / F-02-le (repo-s F-03 = GPS)? | Tooteomanik / analüütik | sprint-02 |
| Milline minimaalne tuvastustäpsus (väike nägu, osaline plaat) on aktsepteeritav? | Dispetšer + DPO | sprint-02 |
| Kas `docs/background-research/h1-noeded.md` luuakse või asendab `112-nouded.md` lüngad? | Analüütik | sprint-02 |
| Konkreetne pilve- vs on-device latentsus 3×1080p pildil (p50/p95)? | Arendus (PoC) | sprint-02 |

## Evidence trail

**Repo (kontekst, nõuded, vastuolud)**

- [docs/background-research/112-nouded.md](docs/background-research/112-nouded.md) — F-02 (kuni 3 pilti), NF-05 (piltidel isikuandmed), privaatsuse vastuolu
- [docs/background-research/intervjuu-paastedispetser.md](docs/background-research/intervjuu-paastedispetser.md) — näod/autonumbrid maskida; autonumbri erand
- [docs/background-research/intervjuu-taksojuht.md](docs/background-research/intervjuu-taksojuht.md) — privaatsuskõhklemus piltidel
- [docs/roadmap.md](docs/roadmap.md) — sprint 02 `sprint-02-fotoga-teavitus`, F-02 + NF-05
- [README.md](README.md) — DPO roll, NF-05 ülevaade
- [help/oppematerjal.md](help/oppematerjal.md) — harjutusülesande struktuur (viide `h1-noeded.md`-le; **faili repost ei leitud 2026-05-26**)

**Pilveteenused**

- [Google Cloud Vision — Detect faces](https://cloud.google.com/vision/docs/detecting-faces) (ei toeta individual facial recognition)
- [Google Cloud Vision — pricing](https://cloud.google.com/vision/pricing)
- [Google Cloud Vision — release notes (EU multi-region, FACE vs OCR)](https://cloud.google.com/vision/docs/release-notes)
- [Microsoft Azure Face API — Limited Access](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/computer-vision/limited-access-identity)
- [Microsoft Azure Face API — pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/face-api/)
- [Microsoft EU Data Boundary](https://learn.microsoft.com/en-us/privacy/eudb/eudb-learn)
- [Amazon Rekognition — FAQs (DetectText, license plates)](https://aws.amazon.com/rekognition/faqs/)
- [Amazon Rekognition — pricing](https://aws.amazon.com/rekognition/pricing/)
- [AWS EU data protection](https://aws.amazon.com/compliance/eu-data-protection/)

**On-device / avatud lähtekood**

- [Google ML Kit — Face detection](https://developers.google.com/ml-kit/vision/face-detection)
- [Google ML Kit — Android face detection](https://developers.google.com/ml-kit/vision/face-detection/android)
- [Qualcomm MediaPipe Face Detection — performance table](https://huggingface.co/qualcomm/MediaPipe-Face-Detection/blob/0dd669a326ec24a884e51b82741997299d937705/README.md)
- [OnDevice Face Recognition — ML Kit vs MediaPipe timing](https://www.mintlify.com/shubham0204/OnDevice-Face-Recognition-Android/advanced/face-detector-options)
- [Mobile face detection benchmark (Haar, BlazeFace, MTCNN)](https://arxiv.org/pdf/2205.05572)
- [PrivacyGuard (YOLOv8 on-device anonymization)](https://github.com/laythayache/PrivacyGuard)
- [Ultralytics YOLO Flutter app (TFLite/CoreML export)](https://github.com/ultralytics/yolo-flutter-app/tree/0114000f62d465691b98206e35ab30a17f2056fc)
- [YOLOv8 license plate performance (FPS)](https://www.etasr.com/index.php/ETASR/article/download/9983/4821/46744)

**Eesti avalik sektor / andmekaitse**

- [Eesti Riigipilv — ISKE H](https://riigipilv.ee/riigipilvest/riigipilvest-kkk/riigipilve-kasutegurid)
- [Riigiteataja — infosüsteemide turvameetmete süsteem](https://www.riigiteataja.ee/redaktsioonide_vordlus.html?grupiId=317423&vasakAktId=115092020015)
