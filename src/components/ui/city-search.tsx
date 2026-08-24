import { useState } from "react";
import { Button } from "../button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/command.tsx"
import { Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";

const CitySearch = () => {

   const [open, setOpen] = useState(false)
   const [query, setQuery] = useState("")

   const { data: locations, isLoading } = useLocationSearch(query)

   return (
      <>

         <Button
            variant={"outline"}
            className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setOpen(true)}>
            <Search className="mr-2 h-4 w-4" />
            Search Cities
         </Button>

         <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
               placeholder="Type a command or search..."
               value={query}
               onValueChange={setQuery}
            />

            <CommandList>
               {query.length > 2 && !isLoading && (
                  <CommandEmpty>No cities found.</CommandEmpty>
               )}
               <CommandGroup heading="Suggestions">
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
               </CommandGroup>
            </CommandList>
         </CommandDialog>
      </>
   )
}

export default CitySearch