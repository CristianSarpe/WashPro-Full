import React, { useContext } from "react";
import { TranslationContext } from "../TranslationContext"; // Importăm contextul pentru traduceri
import "./Statistics.css";

const Statistics = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  const stats = [
    { img: "/assets/statistics/about-us-1.svg", number: "2000+", text: texts.stats_wash_tracks },
    { img: "/assets/statistics/about-us-2.svg", number: "200+", text: texts.stats_self_wash },
    { img: "/assets/statistics/about-us-3.svg", number: "100+", text: texts.stats_cities },
    { img: "/assets/statistics/about-us-4.svg", number: "8", text: texts.stats_countries },
    { img: "/assets/statistics/about-us-5.svg", number: "12", text: texts.stats_experience },
  ];

  return (
    <div className="statistics-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-box">
          <img src={stat.img} alt="stat-icon" className="stat-img" />
          <h3 className="stat-number">{stat.number}</h3>
          <p className="stat-text">{stat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
