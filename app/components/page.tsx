import StarRating from "@/components/star-rating";

export default function Components() {
  return (
    <div className="flex flex-col justify-center items-center py-8 gap-4">
      <div className="flex flex-col gap-2">
        {/* NPS Score rating goes here */}
        <h1>Star Rating component</h1>
        <StarRating starCount={5} />
      </div>
    </div>
  );
}
