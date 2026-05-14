import ApartmentTemplate from "@/components/ApartmentTemplate";
import { APARTMENTS } from "@/data/apartments";
import { notFound } from "next/navigation";

export default function Page() {
  const apartment = APARTMENTS.find(a => a.id === "suite-lagon");
  if (!apartment) return notFound();
  return <ApartmentTemplate {...apartment} />;
}
