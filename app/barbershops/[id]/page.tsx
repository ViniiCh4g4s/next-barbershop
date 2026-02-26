import React from "react"
import { db } from "@/lib/prisma"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params
  const barbershop = await db.barbershop.findUnique({
    where: { id },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      {/*Imagem*/}
      <div className="relative h-62.5 w-full">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
          asChild
        >
          <Link href="/">
            <MenuIcon />
          </Link>
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon size={18} className="text-primary" />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon size={18} className="text-primary fill-primary" />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/*Descrição*/}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre Nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
    </>
  )
}

export default BarbershopPage
