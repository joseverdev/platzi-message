import React from "react";
import "./AboutContent.css";
import { MessageReceived } from "../../MessageReceived/MessageReceived";

function AboutContent() {
  return (
    <section className="about-content ">
      <h2 className="shadow">Mensajes importantes</h2>
      <section className="about-content__messages">
        {/* <MessageReceived  /> */}
      </section>
    </section>
  );
}

export { AboutContent };
