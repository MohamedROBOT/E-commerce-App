"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWishlist } from "@/context/WishlistContext";
const links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/brands",
    label: "Brands",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const {  status } = useSession();
  const { cartDetails } = useCart();
const { wishlistDetails } = useWishlist()
  return (
    <section className='py-8  '>
      <div className='container mx-auto'>
        <nav className='flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='text-lg font-semibold tracking-tighter'>
              Exclusive E-Commerce
            </span>
          </Link>
          <NavigationMenu className='hidden lg:block'>
            <NavigationMenuList>
              {links.map((link, index) => {
                return (
                  <NavigationMenuItem key={index}>
                    <Link
                      href={link.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === link.path && "underline",
                        "hover:bg-transparent focus:bg-transparent hover:underline"
                      )}>
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className='hidden items-center gap-4 lg:flex'>
            {status === "loading" ? (
              <>
                <Button size='sm' disabled>
                  <Loader2Icon className='animate-spin' />
                  Please wait
                </Button>
                <Button asChild variant='default'>
                  <Link href='/signup'>Sign up</Link>
                </Button>
              </>
            ) : status === "unauthenticated" ? (
              <>
                <Button asChild variant='outline'>
                  <Link href='/login'>Sign in</Link>
                </Button>
                <Button asChild variant='default'>
                  <Link href='/signup'>Sign up</Link>
                </Button>
              </>
            ) : (
              <div className='flex items-center gap-4'>
                <Link className='relative' href='/wishlist'>
                  <Heart className='size-8' />
                  <Badge
                    className='h-5 absolute -top-1/2 -start-1/2 min-w-5 rounded-full px-1 font-mono tabular-nums'
                    variant='destructive'>
                    {wishlistDetails?.data?.length}
                  </Badge>
                </Link>
                <Link className='relative' href='/cart'>
                  <ShoppingCart className='size-8' />
                  {cartDetails?.numOfCartItems !== 0 && (
                    <Badge
                      className='h-5 absolute -top-1/2 -start-1/2 min-w-5 rounded-full px-1 font-mono tabular-nums'
                      variant='destructive'>
                      {cartDetails?.numOfCartItems}
                    </Badge>
                  )}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User className='size-8' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    
                     <Link href='/profile'>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                  
                      <Button
                        variant='outline'
                        onClick={() => signOut({ callbackUrl: "/login" })}>
                        Sign out
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* ****************Mobile*********** */}
          <Sheet>
            <SheetTrigger asChild className='lg:hidden'>
              <Button variant='outline' size='icon'>
                <MenuIcon className='h-4 w-4' />
              </Button>
            </SheetTrigger>
            <SheetContent side='top' className='max-h-screen overflow-auto'>
              <SheetHeader>
                <SheetTitle>
                  <Link href='/' className='flex items-center gap-2 max-w-fit'>
                    <span className='text-lg font-semibold tracking-tighter'>
                      Exclusive E-Commerce
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className='flex flex-col p-4'>
                <div className='flex flex-col gap-6'>
                  {links.map((link, index) => {
                    return (
                      <Link
                        key={index}
                        href={link.path}
                        className={cn(
                          pathname === link.path && " text-red-500"
                        )}>
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                <div className='mt-6 flex flex-col gap-4'>
                  {status === "loading" ? (
                    <>
                      <Button size='sm' disabled>
                        <Loader2Icon className='animate-spin' />
                        Please wait
                      </Button>
                      <Button asChild variant='default'>
                        <Link href='/signup'>Sign up</Link>
                      </Button>
                    </>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button asChild variant='outline'>
                        <Link href='/login'>Sign in</Link>
                      </Button>
                      <Button asChild variant='default'>
                        <Link href='/signup'>Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <>

                       <div className="flex items-center gap-4">
                         <Link className='relative max-w-max' href='/wishlist'>
                  <Heart className='size-8' />
                  <Badge
                    className='h-5 absolute -top-1/2 -start-1/2 min-w-5 rounded-full px-1 font-mono tabular-nums'
                    variant='destructive'>
{wishlistDetails?.data?.length}                  </Badge>
                </Link>
                <Link className='relative max-w-max' href='/cart'>
                  <ShoppingCart className='size-8' />
                   {cartDetails?.numOfCartItems !== 0 && (
                    <Badge
                      className='h-5 absolute -top-1/2 -start-1/2 min-w-5 rounded-full px-1 font-mono tabular-nums'
                      variant='destructive'>
                      {cartDetails?.numOfCartItems}
                    </Badge>
                  )}
                </Link>
                       </div>
                    <Button
                      variant='default'
                      onClick={() => signOut({ callbackUrl: "/login" })}>
                      Sign out
                    </Button>
                 
                </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
