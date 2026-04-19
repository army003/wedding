import Image from "next/image";

import heroImg from "@/assets/New Collection.png";
import bgWife from "@/assets/background-wife.png";
import bgPattern from "@/assets/background.png";
import ouImg from "@/assets/oyu.png";
import shadow2Img from "@/assets/shadow-2.png";
import sixImg from "@/assets/six.png";
import lebediImg from "@/assets/lebedi.svg";

import CountdownSection from "./CountdownSection";
import MusicPlayer from "./MusicPlayer";

export default function WeddingInvitation() {
  const oySmallH = 30;
  const oySmallW = Math.round((ouImg.width / ouImg.height) * oySmallH);

  return (
    <main className="wi-page">
      <MusicPlayer />
      <section aria-label="Шақыру">
        <div className="wi-hero-frame">
          <Image
            className="wi-hero-bg"
            src={heroImg}
            alt=""
            fill
            priority
            sizes="(max-width: 500px) 100vw, 500px"
          />
          <p className="wi-header-text wi-fade-1">ТОЙҒА ШАҚЫРУ</p>
          <div className="wi-names-overlay wi-fade-2">
            <p className="wi-card-text">
              Мұхаммадәлі
              <br />
              &amp;
              <br />
              Жәмиля
            </p>
          </div>
          <div className="wi-date-overlay wi-fade-3">
            <p className="wi-card-date">06.07.26</p>
          </div>
          <div className="wi-footer-text wi-fade-4">
            ЕГІНСУ 29/1, САМИР - 1<br />
            АЛМАТЫ
          </div>
        </div>
      </section>

      <div className="wi-invite-paper">
        <section
          className="wi-invite-letter"
          lang="kk"
          aria-label="Шақыру мәтіні"
        >
          <div className="wi-invite-letter__content">
            <p className="wi-invite-greeting">
              <span className="wi-invite-greeting__lead">
                Құрметті ағайын туыс,
              </span>
              бауырлар, құда жекжат, нағашы,
              <br />
              дос-жарамдар!
            </p>
            <p className="wi-invite-details">
              сіздерді ұлымыз Мұхаммадәлі
              <br />
              келініміз Жәмиляның
              <br />
              үйлену тойына арналған ақ
              <br />
              дастарханымыздың құрметті қонағы
              <br />
              болуға шақырамыз!
            </p>
            <Image
              className="wi-invite-swans"
              src={lebediImg}
              alt=""
              width={lebediImg.width}
              height={lebediImg.height}
            />
          </div>
        </section>

        <section className="wi-ceremony" lang="kk" aria-label="Той салтанаты">
          <Image
            className="wi-ceremony__bg"
            src={bgPattern}
            alt=""
            fill
            sizes="(max-width: 500px) 100vw, 500px"
          />
          <Image
            className="wi-ceremony__decor"
            src={shadow2Img}
            alt=""
            width={shadow2Img.width}
            height={shadow2Img.height}
          />
          <h2 className="wi-ceremony__title">Той салтанаты</h2>
          <figure className="wi-ceremony__figure">
            <Image
              src={sixImg}
              alt="6"
              width={sixImg.width}
              height={sixImg.height}
            />
          </figure>
          <p className="wi-ceremony__datetime">
            шілде, <strong>13:00</strong>
          </p>
          <p className="wi-ceremony__venue">
            Алматы қаласы, “Ажар” ықшам ауданы,
            <br /> Егінсу көшесі 29/1
            <br />
            “Самир-1” мейрамханасында
            <br />
            өтеді
          </p>
          <a
            className="wi-ceremony__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://2gis.kz/almaty/geo/70000001101564286/76.801190,43.176997"
          >
            Мекенжай сілтемесі
          </a>
        </section>

        <section className="wi-owners">
          <Image src={ouImg} alt="" width={oySmallW} height={oySmallH} />
          <p style={{ fontSize: 20, textTransform: "uppercase", margin: 0 }}>
            той йелері
          </p>
          <p style={{ fontSize: 20, textTransform: "uppercase", margin: 0 }}>
            Алдан & Жанна
          </p>
          <Image src={ouImg} alt="" width={oySmallW} height={oySmallH} />
        </section>
      </div>

      <CountdownSection background={bgWife} />
    </main>
  );
}
