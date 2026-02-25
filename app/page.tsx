import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { db } from "@/lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
export default async function Home() {
  // Chamando meu banco de Dados
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      {/*Cabeçalho*/}
      <Header />
      <div className="p-5">
        {/*Boas-Vindas*/}
        <h2 className="text-xl font-bold">Olá, Vinicius</h2>
        <p>Segunda-feira 05 de agosto.</p>

        {/*Busca*/}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/*Imagem*/}
        <div className="relative mt-6 h-37.5 w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/*Agendamento*/}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/*Esquerda*/}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/*Direita*/}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-7">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/*Recomendados*/}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
