    import { Star } from 'lucide-react';
    
    
    export  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // whole stars
    const emptyStars = 5 - fullStars; // remaining stars

    return (
      <div className="flex flex-row items-center gap-1 text-yellow-400">
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <Star size={14} key={`full-${i}`} fill="currentColor" stroke="currentColor" />
          ))}

        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <Star size={14} key={`empty-${i}`} stroke="currentColor" />
          ))}
      </div>
    );
  };