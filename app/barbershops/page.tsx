import React from "react"
import { db } from "@/app/_lib/prisma"
import BarbershopItem from "@/app/_components/barbershop-item"
import Header from "@/app/_components/header"
import Search from "@/app/_components/search"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = await searchParams
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })

  return (
    <>
      <Header />
      <div className="px-5">
        <div className="mt-6">
          <Search />
        </div>
        <h2 className={"mt-6 mb-3 text-xs font-bold text-gray-400 uppercase"}>
          Resultados para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
