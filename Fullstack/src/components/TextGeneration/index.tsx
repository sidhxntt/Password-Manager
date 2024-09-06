"use client";
import { TextGenerateEffect } from "./TextGeneration";

const words = `Oh, you clicked me without adding any accounts first? Well, aren't you a trendsetter! Trying to view the invisible must be the new thing. Don't worry, go ahead and add an account, and we'll reward your adventurous spirit with some actual information.
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
