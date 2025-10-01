import CategoriesSection from "@/components/home/CategoriesSection";
import MainSlider from "@/components/home/MainSlider";
import ProductSection from "@/components/home/ProductSection";
import SectionLine from "@/components/shared/SectionLine";

export default function Home() {
  return (
  <div className="container mx-auto">
  <MainSlider />
  <SectionLine />
  <CategoriesSection />
  <SectionLine />
  <ProductSection />
  </div>
  );
}
