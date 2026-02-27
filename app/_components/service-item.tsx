"use client"
import React from "react"
import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/app/_components/ui/sheet"
import { Calendar } from "@/app/_components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { format, set } from "date-fns"
import { createBooking } from "@/app/_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = React.useState<string>("")
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
  }
  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    // 1. Validação antecipada com feedback
    if (!selectedDate || !selectedTime) {
      toast.error("Por favor, selecione uma data e horário.")
      return
    }

    if (!data?.user) {
      toast.error("Você precisa estar logado para agendar.")
      return
    }

    try {
      // 2. ["09" : "00"]
      const [hour, minute] = selectedTime.split(":").map(Number)

      const dateWithTime = set(selectedDate, {
        hours: hour,
        minutes: minute,
      })

      // 3. Chamada de API com tratamento de estado
      await createBooking({
        userId: "cmm3gj1rb00005dnwktyug84z",
        serviceId: service.id,
        date: dateWithTime,
      })

      toast.success("Reserva realizada com sucesso!")
      // Opcional: fechar o Sheet ou redirecionar
    } catch (error) {
      console.error(error)
      toast.error("Erro ao realizar a reserva. Tente novamente.")
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/*Image*/}
        <div className="relative size-27.5">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/*Direta*/}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85%] overflow-y-auto sm:max-w-[85%]"
              >
                <SheetHeader>
                  <SheetTitle className="pt-5 pl-3">Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="border-y border-solid py-2">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    classNames={{
                      nav: "flex items-center gap-1 absolute top-0 right-0",
                      month_caption: "flex items-center h-(--cell-size) px-1",
                      caption_label: "text-sm font-medium capitalize",
                      day: "relative w-full h-full p-0 text-center select-none aspect-square rounded-full",
                    }}
                  />
                </div>

                {selectedDate && (
                  <div className="flex min-h-14 gap-3 overflow-x-auto border-b border-solid px-5 pb-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={
                          selectedTime === time ? "default" : "secondary"
                        }
                        className="rounded-full"
                        onClick={() => handleTimeChange(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDate && (
                  <div className="px-5 pt-2">
                    <Card>
                      <CardContent className="space-y-2 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDate, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="p-5 pb-10">
                  <SheetClose asChild>
                    <Button
                      className="rounded-xl py-6"
                      onClick={handleCreateBooking}
                    >
                      Reservar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
