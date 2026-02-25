import React from "react"
import { Barbershop } from "@/app/generated/prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-41.75 rounded-2xl">
      <CardContent className="p-0">
        {/*Imagem*/}
        <div className="relative h-39.75 w-full">
          <Image
            fill
            className="rounded-2xl object-cover p-1"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge
            className="absolute top-2 left-2 space-x-1 bg-[#221C3D]/70 py-1 backdrop-blur-xs"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/*Texto*/}
        <div className="px-2 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
