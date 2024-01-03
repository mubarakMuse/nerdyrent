"use client"
import React from "react";
import ApartmentSearchForm from "@/components/ApartmentSearchForm";
import pic from "@/app/assets/apartment-hunting.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleButtonClick = () => {
    router.push("/submissions/new");
  };

  return (
    <div className="font-serif">
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight md:-mb-4">
            Apartment Hunting Simplified
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Streamline your apartment search. Define your preferences, and let property owners come to you with offers that match your criteria.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleButtonClick}
              className="px-6 py-3 bg-black hover:bg-black text-white text-xl rounded-full"
            >
              Get Started →
            </button>
            <button
              onClick={() => scrollToSection("howItWorks")}
              className="px-6 py-3 border border-black hover:bg-gray-200 text-black text-xl rounded-full"
            >
              How It Works
            </button>
          </div>
        </div>
        <div className="lg:w-full">
          <Image
            src={pic}
            alt="Apartment Hunting Simplified"
            className="w-full"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>

      <section id="howItWorks" className="bg-base-200 border border-base-300">
        <div className="p-8 ">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold mb-8">Our Easy Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {renderServiceCard("Specify Your Preferences", "Complete our form with details about your apartment requirements, such as size, location, and amenities.")}
              {renderServiceCard("Get Matched", "Property owners with matching units will contact you with their top offers, including exclusive deals.")}
              {renderServiceCard("Select & Move In", "Explore your options and choose your ideal apartment. Your move-in date is just around the corner!")}
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Why Choose Us? */}
      <section id="whyChooseUs" className="bg-white">
        <div className="p-8">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {renderFeatureCard("Unmatched Convenience", "Our platform makes finding your dream apartment effortless and fast.")}
              {renderFeatureCard("Personalized Options", "Receive offers tailored to your specific preferences and requirements.")}
              {renderFeatureCard("Trusted Network", "Connect with reputable property owners and verified listings.")}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-10 bg-base-200 text-center" id="form">
        <ApartmentSearchForm />
      </section> */}
    </div>
  );
}

function renderServiceCard(title, description) {
  return (
    <div className="card bg-white text-center rounded-lg shadow-md flex flex-col">
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}

function renderFeatureCard(title, description) {
  return (
    <div className="card bg-base-100 text-center rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
