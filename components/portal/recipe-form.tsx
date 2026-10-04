"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { recipeSchema, slugify } from "@/lib/portal/validation";
import { saveRecipe, removeRecipe } from "@/lib/portal/actions";
import { EditForm, Field, ConfirmButton } from "./forms";
export type RecipeRecord = z.infer<typeof recipeSchema> & { id: string };
function Lines({
  label,
  rows,
  setRows,
}: {
  label: string;
  rows: string[];
  setRows: (rows: string[]) => void;
}) {
  return (
    <div className="portal-wide">
      <h3>{label}</h3>
      {rows.map((row, i) => (
        <div className="portal-row-input" key={i}>
          <label style={{ flex: 1 }}>
            {i + 1}. satır
            <textarea
              required
              value={row}
              rows={2}
              maxLength={label === "Malzemeler" ? 500 : 2000}
              onChange={(e) =>
                setRows(rows.map((r, j) => (i === j ? e.target.value : r)))
              }
            />
          </label>
          <button
            type="button"
            aria-label={label + " " + (i + 1) + ". satırı kaldır"}
            onClick={() => setRows(rows.filter((_, j) => j !== i))}
          >
            Kaldır
          </button>
        </div>
      ))}
      <button
        type="button"
        className="portal-link"
        onClick={() => setRows([...rows, ""])}
      >
        + Satır ekle
      </button>
    </div>
  );
}
export function RecipeForm({ recipe }: { recipe?: RecipeRecord }) {
  const router = useRouter();
  const [title, setTitle] = useState(recipe?.title ?? ""),
    [slug, setSlug] = useState(recipe?.slug ?? ""),
    [slugEdited, setSlugEdited] = useState(Boolean(recipe));
  const [ingredients, setIngredients] = useState(recipe?.ingredients ?? [""]),
    [steps, setSteps] = useState(recipe?.steps ?? [""]);
  const [file, setFile] = useState<File | null>(null),
    [preview, setPreview] = useState(recipe?.cover_image ?? "");
  useEffect(
    () => () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  return (
    <>
      <EditForm
        action={(form) => {
          const data = Object.fromEntries(form);
          const image = new FormData();
          if (file) image.set("image", file);
          return saveRecipe(
            {
              ...data,
              title,
              slug,
              ingredients,
              steps,
              cover_image:
                recipe?.cover_image ||
                (file ? "/images/recipes/upload-pending.webp" : ""),
              tags: String(data.tags ?? "")
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
              micro_nutrients: String(data.micro_nutrients ?? "")
                .split("\n")
                .filter((x) => x.trim())
                .map((row) => {
                  const [label, ...rest] = row.split(":");
                  return { label: label.trim(), value: rest.join(":").trim() };
                }),
              featured: data.featured === "on",
            },
            recipe?.id,
            image,
          );
        }}
        onSaved={(r) => {
          if (!recipe && r.id) router.push("/admin/tarifler/" + r.id);
        }}
      >
        <label>
          Tarif adı
          <input
            value={title}
            required
            maxLength={180}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
          />
        </label>
        <label>
          Sayfa URL’si (slug)
          <input
            value={slug}
            required
            maxLength={200}
            onChange={(e) => {
              setSlugEdited(true);
              setSlug(e.target.value);
            }}
          />
          <span className="portal-muted">
            Başlığı değiştirmek mevcut URL’yi değiştirmez. Yayındaki URL’yi
            koruyun.
          </span>
        </label>
        <Field name="subtitle" label="Alt başlık" value={recipe?.subtitle} />
        <Field
          name="category"
          label="Kategori"
          value={recipe?.category}
          options={["Kahvaltı", "Ana Yemek", "Ara Öğün", "Tatlı"]}
        />
        <Field
          name="description"
          label="Kart ve SEO açıklaması"
          type="textarea"
          value={recipe?.description}
          wide
        />
        <Field
          name="hero_description"
          label="Tarif giriş metni"
          type="textarea"
          value={recipe?.hero_description}
          wide
        />
        <div className="portal-wide">
          {preview && (
            <div className="portal-cover-preview">
              <Image
                src={preview}
                alt="Seçili kapak önizlemesi"
                fill
                sizes="500px"
                unoptimized={preview.startsWith("blob:")}
              />
            </div>
          )}
          <label>
            Kapak fotoğrafı
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const selected = e.target.files?.[0] ?? null;
                setFile(selected);
                setPreview(
                  selected
                    ? URL.createObjectURL(selected)
                    : (recipe?.cover_image ?? ""),
                );
              }}
            />
          </label>
          <p className="portal-muted">
            JPG, PNG, WebP · En fazla 5 MB. Yeni fotoğraf kayıt başarılı
            olduğunda kullanılır.
          </p>
        </div>
        <Field
          name="image_alt"
          label="Görsel açıklaması (alt metin)"
          value={recipe?.image_alt}
          required
          wide
        />
        <Field
          name="servings"
          label="Porsiyon"
          value={recipe?.servings}
          required
        />
        <Field
          name="difficulty"
          label="Zorluk (belirtilmişse)"
          value={recipe?.difficulty}
        />
        <Field
          name="prep_time"
          label="Hazırlık süresi"
          value={recipe?.prep_time}
        />
        <Field
          name="cook_time"
          label="Pişirme süresi"
          value={recipe?.cook_time}
        />
        <Field
          name="total_time"
          label="Toplam süre"
          value={recipe?.total_time}
        />
        <Field
          name="nutrition_type"
          label="Beslenme tipi"
          value={recipe?.nutrition_type}
        />
        <Field
          name="tags"
          label="Etiketler (virgülle ayırın)"
          value={recipe?.tags.join(", ")}
          wide
        />
        <Field
          name="allergens"
          label="Alerjenler"
          value={recipe?.allergens}
          wide
        />
        <Lines label="Malzemeler" rows={ingredients} setRows={setIngredients} />
        <Lines label="Hazırlama adımları" rows={steps} setRows={setSteps} />
        <div className="portal-wide">
          <h3>Bir porsiyon için yaklaşık besin değerleri</h3>
          <p className="portal-muted">
            Değer belirtilmemişse boş bırakın; sıfır girmeyin.
          </p>
        </div>
        {(
          [
            ["calories", "Enerji (kcal)"],
            ["protein", "Protein (g)"],
            ["carbs", "Karbonhidrat (g)"],
            ["fat", "Yağ (g)"],
            ["fiber", "Lif (g)"],
          ] as const
        ).map(([key, label]) => (
          <Field
            key={key}
            name={key}
            label={label}
            type="number"
            value={recipe?.[key]}
          />
        ))}
        <Field
          name="micro_nutrients"
          label="Besin öne çıkanları (her satır: besin adı: değer)"
          type="textarea"
          value={recipe?.micro_nutrients
            .map((n) => n.label + (n.value ? ": " + n.value : ""))
            .join("\n")}
          wide
        />
        <Field
          name="calculation_note"
          label="Besin değerleri açıklaması"
          type="textarea"
          value={recipe?.calculation_note}
          wide
        />
        <Field
          name="dietitian_note"
          label="Diyetisyen notu"
          type="textarea"
          value={recipe?.dietitian_note}
          wide
        />
        <Field
          name="serving_suggestion"
          label="Servis önerisi"
          type="textarea"
          value={recipe?.serving_suggestion}
          wide
        />
        <Field
          name="tip"
          label="Püf noktası / kaynak atfı"
          type="textarea"
          value={recipe?.tip}
          wide
        />
        <Field
          name="status"
          label="Yayın durumu"
          value={recipe?.status ?? "draft"}
          options={["Taslak", "Yayında", "Arşiv"]}
          values={["draft", "published", "archived"]}
        />
        <label className="portal-check">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={recipe?.featured}
          />
          Öne çıkar
        </label>
      </EditForm>
      {recipe && (
        <ConfirmButton
          label="Tarifi sil"
          title="Tarif silinsin mi?"
          description="Tarif siteden ve yönetim listesinden kaldırılır. Kayıt veritabanında silindi olarak saklanır."
          action={async () => {
            const r = await removeRecipe(recipe.id);
            if (r.success) router.push("/admin/tarifler");
            return r;
          }}
        />
      )}
    </>
  );
}
