"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "How do we get started?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Click <a className="text-blue-600 hover:underline" href="/submissions/new">here to fill out the form</a> and get started. It only takes about 2 minutes.
      </div>
    ),
  },
  {
    question: "Is this service free?",
    answer: (
      <p>
        Absolutely! Our platform is free for users. We generate revenue by providing apartment managers with access to our users&apos; submissions, allowing them to reach out with offers.
      </p>
    ),
  },
  {
    question: "Is my data secure with your service?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Absolutely. We take data security very seriously and implement industry-standard security measures to protect your information. Our servers are encrypted, and we regularly update our protocols to ensure the safety of your data.
      </div>
    ),
  },
  {
    question: "I have another question. How can I contact you?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        No problem, feel free to email us at <a className="text-blue-600 hover:underline" href="mailto:supereasyrent1@gmail.com">SuperEasyRent1@gmail.com</a>.
      </div>
    ),
  },
];


const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-white" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
