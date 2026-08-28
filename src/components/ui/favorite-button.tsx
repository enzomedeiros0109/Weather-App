import type { WeatherData } from "@/api/types"
import { useFavorite } from "@/hooks/use-favorite"
import { Button } from "../button"
import { Star } from "lucide-react"
import { toast } from "sonner"

interface FavoriteButtonProps {
   data: WeatherData
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {

   const { addToFavorite, isFavorite, removeFavorite } = useFavorite()
   const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

   const handleToggleFavorite = () => {
      if (isCurrentlyFavorite) {
         removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`, {
            onSuccess: () => toast.error(`Removed ${data.name} from favorites`),
         })
      } else {
         addToFavorite.mutate(
            { name: data.name, lat: data.coord.lat, lon: data.coord.lon, country: data.sys.country },
            { onSuccess: () => toast.success(`Added ${data.name} to favorites`) }
         )
      }
   }

   return (
      <Button
         onClick={handleToggleFavorite}
         variant={isCurrentlyFavorite ? "default" : "outline"}
         size={"icon"}
         className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      >
         <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
      </Button>
   )
}

export default FavoriteButton