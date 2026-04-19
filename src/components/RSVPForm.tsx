"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";

const FORM_ID = "1FAIpQLSdMPIGm6baKyc87hdMGvtQwrCbXY6khIqy3A2MdyPVhnhqrag";

const COMING_OPTIONS = [
  { value: "Иә, келеді", label: "Иә, келемін" },
  { value: "Жоқ, келмейді", label: "Жоқ, келмеймін" },
];

const ENTRY = {
  name: "entry.593803208",
  spouse: "entry.1976461133",
  coming: "entry.322682373",
  phone: "entry.940243814",
};

/** Маска: +7 (000) - 000 - 00 - 00 */
function formatPhoneRu(value: string) {
  let d = value.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) {
    d = d.length <= 10 ? "7" + d : d.slice(0, 11);
  }
  d = d.slice(0, 11);
  if (d === "7") return "+7";

  const x = d.slice(1);
  const p = [x.slice(0, 3), x.slice(3, 6), x.slice(6, 8), x.slice(8, 10)];

  let s = "+7";
  if (p[0]) {
    s += ` (${p[0]}`;
    if (p[0].length === 3) s += ")";
  }
  if (p[1] && p[0].length === 3) s += ` - ${p[1]}`;
  if (p[2] && p[1].length === 3) s += ` - ${p[2]}`;
  if (p[3] && p[2].length === 2) s += ` - ${p[3]}`;
  return s;
}

function isPhoneComplete(phone: string): boolean {
  return phone.replace(/\D/g, "").length === 11;
}

type FormState = {
  name: string;
  spouse: string;
  coming: string;
  phone: string;
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    spouse: "",
    coming: "Иә, келеді",
    phone: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [comingOpen, setComingOpen] = useState(false);
  const comingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!comingOpen) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target;
      if (
        comingRef.current &&
        t instanceof Node &&
        !comingRef.current.contains(t)
      ) {
        setComingOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setComingOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [comingOpen]);

  const set =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !isPhoneComplete(form.phone)) return;
    setStatus("loading");

    const body = new FormData();
    body.append(ENTRY.name, form.name.trim());
    body.append(ENTRY.spouse, form.spouse.trim());
    body.append(ENTRY.coming, form.coming);
    body.append(ENTRY.phone, form.phone.trim());

    try {
      await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
        method: "POST",
        body,
        mode: "no-cors",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        .rsvp {
          width: 100%;
          max-width: min(100%, 500px);
          margin: 0 auto;
          box-sizing: border-box;
          background: #fff;
          padding: clamp(2rem, 9vw, 3.5rem) clamp(1.25rem, 5vw, 2rem) clamp(2.5rem, 10vw, 4rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 4vw, 1.75rem);
        }

        .rsvp__title {
          margin: 0 0 0.25rem;
           font-family:  "Cormorant Garamond", serif;
          font-size: clamp(1.1rem, 8vw, 1.5rem);
          font-weight: 500;
          color: #1c1c1e;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .rsvp__sub {
          margin: 0 0 clamp(0.5rem, 2vw, 1rem);
           font-family:  "Cormorant Garamond", serif;
          font-size: clamp(0.78rem, 6vw, 0.92rem);
          color: #6b6b6b;
          font-weight: 500;
          text-align: center;
          line-height: 1.5;
        }

        .rsvp__field {
          display: flex;
          text-align: left;
          flex-direction: column;
          gap: 0.45rem;
        }

        .rsvp__label {
           font-family:  "Cormorant Garamond", serif;
          font-size: clamp(0.78rem, 3.2vw, 0.92rem);
          color: #1c1c1e;
          font-weight: 400;
        }

        .rsvp__label span {
          color: #b04a4a;
          margin-left: 2px;
        }

        .rsvp__input,
        .rsvp__select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #d5d0ca;
          border-radius: 6px;
          background: #faf9f7;
           font-family:  "Inter", serif;
          font-size: clamp(0.82rem, 3.4vw, 0.95rem);
          color: #1c1c1e;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          -webkit-appearance: none;
          appearance: none;
        }

        .rsvp__input::placeholder {
          color: #b0aba4;
        }

        .rsvp__input:focus,
        .rsvp__select:focus {
          border-color: #2b2c31;
          background: #fff;
        }

        .rsvp__select-wrap {
          position: relative;
        }

        .rsvp__select-wrap::after {
          content: "▾";
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #6b6b6b;
          font-size: 0.85rem;
        }

        .rsvp__select {
          display: block;
          padding-right: 2.5rem;
          cursor: pointer;
          text-align: left;
        }

        .rsvp__custom-list {
          list-style: none;
          margin: 0.35rem 0 0;
          padding: 0.35rem 0;
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          z-index: 160;
          background: #fff;
          border: 1.5px solid #d5d0ca;
          border-radius: 6px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
          box-sizing: border-box;
        }

        .rsvp__custom-list li {
          margin: 0;
        }

        .rsvp__custom-option {
          width: 100%;
          padding: 0.65rem 1rem;
          border: none;
          background: transparent;
          font-family: "Inter", serif;
          font-size: clamp(0.82rem, 3.4vw, 0.95rem);
          color: #1c1c1e;
          cursor: pointer;
          text-align: left;
          box-sizing: border-box;
          transition: background 0.15s;
        }

        .rsvp__custom-option:hover,
        .rsvp__custom-option:focus-visible {
          outline: none;
          background: #f2f0ed;
        }

        .rsvp__custom-option.is-selected {
          background: #ebe8e3;
          font-weight: 500;
        }

        .rsvp__btn {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.9rem 1rem;
          background: #2b2c31;
          color: #fff;
          border: none;
          border-radius: 6px;
           font-family:  "Cormorant Garamond", serif;
          font-size: clamp(0.88rem, 3.6vw, 1rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .rsvp__btn:hover:not(:disabled) {
          background: #1a1b1f;
          transform: translateY(-1px);
        }

        .rsvp__btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .rsvp__error {
          text-align: center;
           font-family:  "Cormorant Garamond", serif;
          font-size: clamp(0.72rem, 2.8vw, 0.82rem);
          color: #b04a4a;
        }

        /* Modal */
        .rsvp-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: rsvpFadeIn 0.25s ease;
        }

        @keyframes rsvpFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .rsvp-modal {
          position: relative;
          background: #fff;
          border-radius: 16px;
          padding: 3rem 2rem 2.5rem;
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          animation: rsvpSlideUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }

        @keyframes rsvpSlideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .rsvp-modal__close {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          width: 32px;
          height: 32px;
          border: none;
          background: #f2f0ed;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.75rem;
          color: #6b6b6b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }

        .rsvp-modal__close:hover { background: #e5e2de; }

        /* Success content */
        .rsvp-success__icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #2b2c31;
          color: #fff;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rsvp-success__title {
          margin: 0;
           font-family:  "Cormorant Garamond", serif;
          font-size: 1.35rem;
          font-weight: 500;
          color: #1c1c1e;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .rsvp-success__sub {
          margin: 0;
           font-family:  "Cormorant Garamond", serif;
          font-size: 0.9rem;
          color: #6b6b6b;
          text-align: center;
          line-height: 1.5;
        }
      `}</style>

      {status === "success" && (
        <div className="rsvp-modal-overlay" onClick={() => setStatus("idle")}>
          <div className="rsvp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rsvp-success__icon">✓</div>
            <p className="rsvp-success__title">Рақмет!</p>
            <p className="rsvp-success__sub">Сіздің жауабыңыз қабылданды</p>
            <button
              className="rsvp-modal__close"
              onClick={() => setStatus("idle")}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section className="rsvp">
        <div>
          <p className="rsvp__title">
            Тойға қатысуыңызды растауыңызды сұраймыз
          </p>
          <p className="rsvp__sub">Жауабыңызды 01.06 дейін күтеміз</p>
        </div>

        {/* Аты-жөні */}
        <div className="rsvp__field">
          <label className="rsvp__label">
            Аты-жөніңіз<span>*</span>
          </label>
          <input
            className="rsvp__input"
            type="text"
            placeholder="Осы жерге жазыңыз"
            value={form.name}
            onChange={set("name")}
          />
        </div>

        {/* Жұбайының аты-жөні */}
        <div className="rsvp__field">
          <label className="rsvp__label">
            Жұбайыңыздың аты-жөні{" "}
            <span style={{ color: "#b0aba4", fontWeight: 400 }}>
              (егер болса)
            </span>
          </label>
          <input
            className="rsvp__input"
            type="text"
            placeholder="Осы жерге жазыңыз"
            value={form.spouse}
            onChange={set("spouse")}
          />
        </div>

        {/* Тойға келесіз бе? */}
        <div className="rsvp__field">
          <label className="rsvp__label">
            Тойға келесіз бе?<span>*</span>
          </label>
          <div className="rsvp__select-wrap" ref={comingRef}>
            <button
              type="button"
              className="rsvp__select"
              aria-expanded={comingOpen}
              aria-haspopup="listbox"
              onClick={() => setComingOpen((o) => !o)}
            >
              {COMING_OPTIONS.find((o) => o.value === form.coming)?.label}
            </button>
            {comingOpen && (
              <ul className="rsvp__custom-list" role="listbox">
                {COMING_OPTIONS.map((o) => (
                  <li key={o.value} role="none">
                    <button
                      type="button"
                      className={
                        "rsvp__custom-option" +
                        (form.coming === o.value ? " is-selected" : "")
                      }
                      role="option"
                      aria-selected={form.coming === o.value}
                      onClick={() => {
                        setForm((f) => ({ ...f, coming: o.value }));
                        setComingOpen(false);
                      }}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Телефон */}
        <div className="rsvp__field">
          <label className="rsvp__label">
            Телефон нөміріңіз<span>*</span>
          </label>
          <input
            className="rsvp__input"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="+7 (000) - 000 - 00 - 00"
            value={form.phone}
            onChange={(e) =>
              setForm((f) => ({ ...f, phone: formatPhoneRu(e.target.value) }))
            }
          />
        </div>

        {status === "error" && (
          <p className="rsvp__error">Қате орын алды. Қайталап көріңіз.</p>
        )}

        <button
          className="rsvp__btn"
          onClick={handleSubmit}
          disabled={
            status === "loading" ||
            !form.name.trim() ||
            !isPhoneComplete(form.phone)
          }
        >
          {status === "loading" ? "Жіберілуде..." : "Тіркелу"}
        </button>
      </section>
    </>
  );
}
