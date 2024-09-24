"use client";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  FaTemperatureHigh,
  FaBell,
  FaBrain,
  FaExclamationTriangle,
} from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import { FlipWords } from "@/components/ui/flip-words";
import { useRouter } from "next/navigation";
import FAQSection from "@/components/faq-section";
export default function Home() {
  const words = ["Top-Notch Safety", "Best Efficiency", "Peak Performance"];
  const features = [
    {
      icon: FaTemperatureHigh,
      title: "Continuous Monitoring",
      data: "Our system constantly tracks appliance temperatures and gas levels using integrated sensors.",
      color: "#E63946", // Crimson Red
    },
    {
      icon: FaBell,
      title: "Real-Time Notifications",
      data: "Stay informed via web or mobile alerts to act fast in case of a gas leak or overheating.",
      color: "#FF8C00", // Dark Orange
    },
    {
      icon: FaBrain,
      title: "Predictive Maintenance",
      data: "Machine Learning analyzes data to predict future risks like overheating or gas leaks, helping you avoid accidents and costly repairs.",
      color: "#F4D03F", // Golden Yellow
    },
    {
      icon: FaExclamationTriangle,
      title: "Prevent Appliance Damage and Hazards",
      data: "Take immediate action to shut off appliances or handle leaks, ensuring safety and preventing potential harm.",
      color: "#2ECC71", // Emerald Green
    },
  ];
  const router = useRouter();
  return (
    <main className="flex h-full w-full flex-col items-center justify-between p24">
      <div className="overflow-auto h-full w-full">
        <section className="h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="w-full h-full p-2 flex justify-around items-center">
            <div className="w-1/2 flex gap-4  flex-col items-start">
              <h1 className="text-5xl font-extrabold relative">
                Experience
                <FlipWords words={words} />
                with Smart Appliance Tracking
              </h1>
              <h2 className="text-3xl text-gray-500 font-light ">
                Early warnings for a safer tomorrow
              </h2>
              <Button
                className="bg-black/90 text-xl text-white"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Get Started
              </Button>
            </div>
            <img src="/YesYes.png" className="h-[34rem]" />
          </div>
        </section>
        <section className="h-screen flex items-center justify-center bg-gray-200 p-6 z-20">
          <div className="w-full h-full flex flex-col p-6 justify-center items-center">
            <h1 className="text-5xl font-bold m-4 border-b-2 pb-4 border-black">
              Key Features
            </h1>
            <p className="font-light text-xl text-gray-500">
              Highlights of Our Monitoring System
            </p>
            <div className="overflow-x-scroll flex space-x-8 py-4 h-full">
              <ul className="h-full flex">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div className="w-1/4 m-4 flex flex-col justify-start border-1 border-black/20 bg-gray-100 p-4 gap-4 text-black/80 rounded-xl items-center h-2/3 cursor-default hover:-translate-y-2 duration-200">
                      <div className="w-full flex flex-col justify-center items-center">
                        <div className="rounded-full bg-blac k/30 h-fit w-fit">
                          <Icon
                            className="w-20 h-20 m-4 text-5xl"
                            style={{ color: feature.color }}
                          />
                        </div>
                        <h1 className="font-bold text-2xl"> {feature.title}</h1>
                        {/* <hr className="w-2"/> */}
                      </div>
                      <p className="2">{feature.data}</p>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        <section className="h-screen flex items-center justify-center bg-gray-300 p-6">
          <div className="w-full h-full flex flex-col p-6 justify-center items-center">
            <h1 className="text-5xl font-bold m-4 border-b-2 pb-4 border-black">
              Workflow Overview
            </h1>
            <p className="font-light text-xl text-gray-500 flex justify-center items-center flex-col">
              Visualizing Our System in Action
              <img src="/floww.svg" alt="" />
            </p>
          </div>
        </section>
        <section className="h-screen flex items-center justify-center bg-gray-200 p-6">
          <div className="w-full h-full flex flex-col p-6 justify-center items-center">
            <h1 className="text-5xl font-bold m-4 border-b-2 pb-4 border-black">
              Our Inspiration and Mission
            </h1>
            <p className="text-xl w-1/2">
              <b>Inspired by Recent News:</b> With increasing reports of
              electrical appliances overheating and causing fires—especially
              during heat waves—our concern for safety has grown. Global warming
              has intensified these risks, making such incidents more frequent.
              <br />
              <b>The Impact of Global Warming:</b> Rising global temperatures
              and frequent heat waves pose serious risks to both safety and
              appliance longevity. Overheating not only endangers lives but also
              shortens the lifespan of electrical devices.
              <br />
              <b>Our Motivation: </b>
              In response to these challenges, our team developed a real-time
              monitoring system for electrical appliances. Our goal is to
              enhance safety, prevent potential hazards, and extend the life of
              your devices. By delivering timely alerts about overheating, we
              aim to protect your property and loved ones from harm.
            </p>
          </div>
        </section>
        <section className="h-screen flex items-center justify-center bg-gray-100 p-6">
          <FAQSection />
        </section>
      </div>
    </main>
  );
}
