import React from "react"
import { db } from "@/app/_lib/prisma"
import BarbershopItem from "@/app/_components/barbershop-item"
import Header from "@/app/_components/header"
import Search from "@/app/_components/search"
import { Prisma } from "@prisma/client"

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string
    service?: string
  }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search, service } = await searchParams
  // Constrói o filtro dinamicamente para evitar objetos vazios no OR
  const whereClause: Prisma.BarbershopWhereInput = {
    OR: [
      // Busca no Nome
      search
        ? {
            name: { contains: search, mode: "insensitive" },
          }
        : undefined,

      // Busca no Endereço
      search
        ? {
            address: { contains: search, mode: "insensitive" },
          }
        : undefined,
      service
        ? {
            services: {
              some: { name: { contains: service, mode: "insensitive" } },
            },
          }
        : undefined,
    ].filter(Boolean) as Prisma.BarbershopWhereInput[], // Remove os undefined
  }

  const barbershops = await db.barbershop.findMany({
    where: whereClause,
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <Search />

        <h2 className={"mt-6 mb-3 text-xs font-bold text-gray-400 uppercase"}>
          {search || service ? (
            <span>Resultados para &quot;{search || service}&quot;</span>
          ) : (
            <span>Todas as Barbearias</span>
          )}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {barbershops.length === 0 && (
          <p className="mt-4 text-sm text-gray-400">
            Nenhuma barbearia encontrada.
          </p>
        )}
      </div>
    </>
  )
}

export default BarbershopsPage
