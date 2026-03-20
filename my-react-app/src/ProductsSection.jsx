import React, { useMemo, useState } from "react";
import "./ProductsSection.css";

const CURRENCY = "MDL";
const MAX_OFFER_ITEMS = 3;

const PRODUCTS = [
  // Setează aici prețurile direct în MDL / L
  { id: "foam-premium", name: "Spumă Activă pH 11,5", pricePerLitre: 36.36, imageSrc: "/assets/img.chimie/Universal.png" },
  { id: "liquid-wax", name: "Șampon Auto", pricePerLitre: 27.27, imageSrc: "/assets/img.chimie/Prewasher.png" },
  { id: "wheel-cleaner", name: "Ceară Auto Polimerică", pricePerLitre: 155, imageSrc: "/assets/img.chimie/NanoWax.png" },
  { id: "heavy-duty", name: "Activator de Spumă", pricePerLitre: 85, imageSrc: "/assets/img.chimie/Instafoam.png" },
  { id: "self-service", name: "Spumă Activă pH 12,5", pricePerLitre: 50, imageSrc: "/assets/img.chimie/Dominant.png" },
  { id: "color-foam", name: "Negru de Cauciuc", pricePerLitre: 60, imageSrc: "/assets/img.chimie/BlackBrush.png" },
  { id: "osmotic-rinse", name: "Polish - Interior", pricePerLitre: 150, imageSrc: "/assets/img.chimie/Briliant.png" },
];

const formatMoney = (amount) => {
  if (!Number.isFinite(amount)) return `0.00 ${CURRENCY}`;
  return `${amount.toFixed(2)} ${CURRENCY}`;
};

const API_BASE = "https://washpro-full-backend.onrender.com";

const ProductsSection = () => {
  const [quantities, setQuantities] = useState(
    PRODUCTS.reduce((acc, product) => {
      acc[product.id] = "";
      return acc;
    }, {})
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [offerItems, setOfferItems] = useState([
    { productId: PRODUCTS[0]?.id || "", quantity: "" },
  ]);

  const [formTouched, setFormTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleQuantityChange = (productId, value) => {
    if (value === "" || /^[0-9]*[.,]?[0-9]*$/.test(value)) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: value.replace(",", "."),
      }));
    }
  };

  const getProductTotal = (product) => {
    const qty = parseFloat(quantities[product.id] || "0");
    if (Number.isNaN(qty) || qty <= 0) return 0;
    return qty * product.pricePerLitre;
  };

  const totalEstimated = useMemo(
    () =>
      PRODUCTS.reduce((sum, product) => {
        return sum + getProductTotal(product);
      }, 0),
    [quantities]
  );

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOfferItemChange = (index, field, value) => {
    setOfferItems((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: field === "quantity" ? value.replace(",", ".") : value,
      };
      return next;
    });
  };

  const addOfferItem = () => {
    if (offerItems.length >= MAX_OFFER_ITEMS) return;
    setOfferItems((prev) => [
      ...prev,
      { productId: PRODUCTS[0]?.id || "", quantity: "" },
    ]);
  };

  const removeOfferItem = (index) => {
    setOfferItems((prev) => prev.filter((_, i) => i !== index));
  };

  const getOfferItemTotal = (item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    const qty = parseFloat(item.quantity || "0");
    if (!product || Number.isNaN(qty) || qty <= 0) return 0;
    return qty * product.pricePerLitre;
  };

  const offerTotal = useMemo(() => {
    return offerItems.reduce((sum, item) => sum + getOfferItemTotal(item), 0);
  }, [offerItems]);

  const validateEmail = (email) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 8;
  };

  const isFormValid = () => {
    const itemsValid =
      offerItems.length > 0 &&
      offerItems.length <= MAX_OFFER_ITEMS &&
      offerItems.every((item) => {
        const qty = parseFloat(item.quantity || "0");
        return item.productId && !Number.isNaN(qty) && qty > 0;
      });

    return (
      formData.name.trim().length > 0 &&
      validatePhone(formData.phone) &&
      validateEmail(formData.email) &&
      itemsValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched({
      name: true,
      phone: true,
      email: true,
      offerItems: true,
    });

    if (!isFormValid()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/request-offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: offerItems.map((item) => ({
            productId: item.productId,
            productName: PRODUCTS.find((p) => p.id === item.productId)?.name,
            quantity: parseFloat(item.quantity || "0"),
            pricePerLitre: PRODUCTS.find((p) => p.id === item.productId)?.pricePerLitre,
            itemTotal: getOfferItemTotal(item),
          })),
          total: offerTotal,
          currency: CURRENCY,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const details = data?.details ? ` | details: ${JSON.stringify(data.details)}` : "";
        throw new Error(`${data?.error || "Eroare la trimiterea cererii de ofertă"}${details}`);
      }

      setSubmitMessage("✅ Cererea ta a fost trimisă cu succes. Te contactăm în curând.");
      setFormData({
        name: "",
        phone: "",
        email: "",
      });
      setOfferItems([{ productId: PRODUCTS[0]?.id || "", quantity: "" }]);
      setFormTouched({});
    } catch (error) {
      setSubmitMessage(`❌ ${error?.message || "A apărut o eroare. Te rugăm să încerci din nou."}`);
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputError = (field) => {
    if (!formTouched[field]) return "";

    switch (field) {
      case "name":
        return formData.name.trim().length === 0 ? "Numele este obligatoriu." : "";
      case "phone":
        return !validatePhone(formData.phone) ? "Introduceți un număr de telefon valid (minim 8 cifre)." : "";
      case "email":
        return !validateEmail(formData.email) ? "Introduceți un email valid." : "";
      case "offerItems":
        return offerItems.some((item) => {
          const qty = parseFloat(item.quantity || "0");
          return !item.productId || !item.quantity || Number.isNaN(qty) || qty <= 0;
        })
          ? "Selectați produs(e) și cantitate validă (L) pentru fiecare."
          : "";
      default:
        return "";
    }
  };

  return (
    <section className="products-section">
      <div className="products-section__inner">
        <div className="products-section__top">
          <div>
            <div className="products-section__badge">
              <span className="products-section__badge-dot" />
              Direct de la producător
            </div>
            <h1 className="products-section__title">
              Detergenți Profesionali pentru Spălătorii Auto
            </h1>
            <p className="products-section__subtitle">
              Soluții concentrate, consum optimizat, profit mai mare. Gândite pentru self-service și spălătorii manuale
              care vor consistență și rezultate premium.
            </p>
          </div>
          <div className="products-section__meta">
            <span className="products-section__tag">
              Soluții industriale optimizate pentru cost / spălare
            </span>
            <span className="products-section__total-label">
              Total estimativ coș produse:{" "}
              <span className="products-section__total-value">
                {formatMoney(totalEstimated)}
              </span>
            </span>
          </div>
        </div>

        <div className="products-section__content">
          <div>
            <div className="products-grid">
              {PRODUCTS.map((product) => {
                const total = getProductTotal(product);
                return (
                  <article
                    key={product.id}
                    className="product-card"
                  >
                    <div>
                      <div className="product-card__image">
                        {product.imageSrc && (
                          <img
                            src={product.imageSrc}
                            alt={product.name}
                            className="product-card__img"
                            loading="lazy"
                          />
                        )}
                      </div>

                      <h3 className="product-card__title">
                        {product.name}
                      </h3>
                      <p className="product-card__price">
                        {formatMoney(product.pricePerLitre)} / L
                      </p>

                      <div>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          className="product-card__input"
                          value={quantities[product.id]}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          placeholder="Ex. 25"
                        />
                      </div>
                    </div>

                    <div className="product-card__footer">
                      <span>Total estimativ</span>
                      <span>
                        {formatMoney(total)}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="offer-form">
            <div>
              <h2 className="offer-form__title">
                Solicită o ofertă personalizată
              </h2>
              <p className="offer-form__subtitle">
                Completează detaliile de mai jos și îți trimitem o ofertă cu prețuri optimizate pentru volumul tău.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="offer-form__group">
                <label className="offer-form__label">
                  Nume
                </label>
                <input
                  type="text"
                  className="offer-form__input"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  onBlur={() => setFormTouched((prev) => ({ ...prev, name: true }))}
                  placeholder="Nume"
                />
                {getInputError("name") && (
                  <p className="offer-form__error">{getInputError("name")}</p>
                )}
              </div>

              <div className="offer-form__group">
                <label className="offer-form__label">
                  Telefon <span className="offer-form__required">*</span>
                </label>
                <input
                  type="tel"
                  className="offer-form__input"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  onBlur={() => setFormTouched((prev) => ({ ...prev, phone: true }))}
                  placeholder="+373 6xx xxx xx"
                  required
                />
                {getInputError("phone") && (
                  <p className="offer-form__error">{getInputError("phone")}</p>
                )}
              </div>

              <div className="offer-form__group">
                <label className="offer-form__label">
                  Email <span className="offer-form__required">*</span>
                </label>
                <input
                  type="email"
                  className="offer-form__input"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  onBlur={() => setFormTouched((prev) => ({ ...prev, email: true }))}
                  placeholder="nume@gmail.com"
                  required
                />
                {getInputError("email") && (
                  <p className="offer-form__error">{getInputError("email")}</p>
                )}
              </div>

              <div className="offer-form__group">
                <label className="offer-form__label">
                  Produse în ofertă <span className="offer-form__required">*</span>
                </label>

                <div className="offer-form__items-header">
                  <p className="offer-form__items-note">Maxim {MAX_OFFER_ITEMS} produse</p>
                  <button
                    type="button"
                    className="offer-form__add"
                    onClick={addOfferItem}
                    disabled={offerItems.length >= MAX_OFFER_ITEMS}
                  >
                    + Adaugă
                  </button>
                </div>

                <div className="offer-form__items">
                  {offerItems.map((item, index) => {
                    const itemTotal = getOfferItemTotal(item);
                    return (
                      <div key={`${item.productId}-${index}`} className="offer-form__item-row">
                        <select
                          className="offer-form__select"
                          value={item.productId}
                          onChange={(e) => handleOfferItemChange(index, "productId", e.target.value)}
                        >
                          {PRODUCTS.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} – {formatMoney(product.pricePerLitreMdl)}/L
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          className="offer-form__input"
                          value={item.quantity}
                          onChange={(e) => handleOfferItemChange(index, "quantity", e.target.value)}
                          placeholder="L"
                        />

                        <div className="offer-form__item-total">{formatMoney(itemTotal)}</div>

                        {offerItems.length > 1 && (
                          <button
                            type="button"
                            className="offer-form__remove"
                            onClick={() => removeOfferItem(index)}
                            aria-label="Șterge produs"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {getInputError("offerItems") && (
                  <p className="offer-form__error">{getInputError("offerItems")}</p>
                )}
              </div>

              <div className="offer-form__price-box">
                <div className="space-y-0.5">
                  <p className="text-zinc-400">Preț calculat automat</p>
                  <p className="offer-form__price-value">
                    {formatMoney(offerTotal)}
                  </p>
                </div>
                <p className="offer-form__price-note">
                  Calcul estimativ. Oferta finală se personalizează în funcție de volum și frecvența comenzilor.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className="offer-form__submit"
              >
                {isSubmitting ? "Se trimite..." : "Solicită Ofertă"}
              </button>

              {submitMessage && (
                <p
                  className={`offer-form__message ${
                    submitMessage.startsWith("✅")
                      ? "offer-form__message--success"
                      : "offer-form__message--error"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

