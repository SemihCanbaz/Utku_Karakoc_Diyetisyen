import fs from "node:fs";
import sharp from "sharp";
const target="public/images/recipes/";
const photos=[
["00.29.30","firinda-levrek-ve-renkli-sebzeler"],["00.26.50","patates-puresi-yataginda-istiridye-mantari"],["00.26.05","citir-tavuklu-taco"],["00.25.30","peynirli-hindi-fumeli-kahvalti-tabagi"],["00.38.38","mezgit-kizartma-bezelye-puresi-patates-kizartmasi"]
];
for(const [time,slug] of photos)await sharp("C:/Users/semih/Downloads/WhatsApp Image 2026-10-03 at "+time+".jpeg").rotate().resize(1800,1800,{fit:"inside",withoutEnlargement:true}).webp({quality:92}).toFile(target+slug+".webp");
for(const [prefix,slug] of [["Inegol","inegol-kofte-kekikli-sehriye"],["Firinda_Tavuk_Incik","firinda-tavuk-incik-baharatli-patates-yogurtlu-sebze"],["Izgara_Dana_Steak","izgara-dana-steak-yumurta-meyveli-sporcu-tabagi"],["Karidesli","karidesli-maydanozlu-tagliatelle"]]){
 const file=fs.readdirSync("content-sources").find(f=>f.startsWith(prefix)&&f.includes("-0-0-")&&f.endsWith(".jpg"));
 await sharp("content-sources/"+file).rotate().resize(1800,1800,{fit:"inside",withoutEnlargement:true}).webp({quality:92}).toFile(target+slug+".webp");
}
console.log("9 fotoğraf WebP olarak hazırlandı; içerik değiştirilmedi.");
