import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
export default function Home() {
  return (
    <div>
      {/*Header*/}
      <Header />
      <div className="p-5">
        {/*Boas-Vindas*/}
        <h2 className="text-xl font-bold">Olá, Vinicius</h2>
        <p>Segunda-feira 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-37.5 w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}
