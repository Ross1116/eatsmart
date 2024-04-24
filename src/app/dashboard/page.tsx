"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Cards from "@/components/Cards";
import Footer from "@/components/Footer";

const NavBar = React.lazy(() => import("@/components/NavBar"));
const SideMenuWrapper = React.lazy(
  () => import("@/components/SideMenu/SideMenuWrapper")
);

const SORT_OPTIONS = [
  { name: "Default", value: "none" },
  { name: "Sort by Expiry Date", value: "expiry_date" },
  { name: "Sort by Date Entered", value: "date_entered" },
  { name: "Sort by Name", value: "name" },
] as const;

export default function Dashboard() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  const [filter, setFilter] = useState({
    sort: "none",
  });
  console.log(filter);

  const windowSize = useRef([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= windowSize.current[1] * 0.5) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
    })();
  }, []);

  return (
    <main className="px-36 flex flex-col gap-8 justify-center">
      <div className="absolute top-0 left-0">
        <NavBar />
      </div>

      <motion.div
        className="fixed z-20 right-10 top-10"
        initial={{ opacity: 1, scale: 0 }}
        animate={isScrolled ? { opacity: 1, y: 0, scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Suspense>
          <SideMenuWrapper />
        </Suspense>
      </motion.div>

      <div className="flex pt-40 items-center justify-between relative">
        <div className="flex flex-row items-center justify-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold text-2xl">Welcome Back</div>
            <div className="font-light text-lg">User Email</div>
          </div>
        </div>
        <div className="text-5xl font-bold">Pantry Tracker</div>
      </div>

      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex items-center w-full gap-6">
          <div className="flex items-center justify-center w-full max-w-4xl">
            <div className="flex w-full max-w-4xl items-center space-x-2">
              <Input type="text" placeholder="Search..." />
              <Button type="submit" variant="outline">
                Search <Search className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex justify-center items-center gap-1 hover:text-background-900">
                Sort
                <ChevronDown className="h-5 w-5 flex-shrink-0 group-hover:text-background-900" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background-50 flex flex-col mt-1 ml-28">
                {SORT_OPTIONS.map((option) => (
                  <Button
                    key={option.name}
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        sort: option.value,
                      }));
                    }}
                    className={cn("text-left w-full block px-4 py-2 text-sm", {
                      "bg-background-900 text-text-50":
                        filter.sort === option.value,
                      "text-background-950": filter.sort !== option.value,
                    })}
                  >
                    {option.name}
                  </Button>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="-m-2 ml-4 p-2 inline-flex justify-center items-center gap-1 text-base font-normal group hover:text-background-900">
              Filter
              <Filter className="h-5 w-5 flex-shrink-0 group-hover:text-background-900" />
            </Button>
          </div>
        </div>
        <Button className="bg-primary-400 text-text-100">Add Items</Button>
        <Button className="bg-secondary-400 text-text-100">Delete Items</Button>
      </div>

      <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Expiring in 3 days</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Expiring in 6 days</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Expiring in more than a week</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-rose-400 font-bold">
            Already Expired
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-12 gap-4 grayscale">
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
              <div className="col-span-3">
                <Cards />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="-ml-36">
        <Footer />
      </div>
    </main>
  );
}