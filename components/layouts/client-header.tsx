'use client';

import { Navbar as NextUINavbar, NavbarContent, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import NextLink from 'next/link';

import UserProfileDropdown from './user-profile-dropdown';

import { link as linkStyles } from '@nextui-org/theme';
import { Icone } from '@/components/icons';
import Search from '@/components/layout/search';
import ThemeSwitch from './themeSwitch';
import LocaleSwitch from './localeSwitch';
import { Profile } from '@/types/models';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const ClientHeader = ({ profile }: { profile: Profile | null }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    return (
        <NextUINavbar className="shadow-sm" maxWidth="2xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Icone />
                        <p className="hidden sm:inline-block font-bold text-inherit">Lunion-Booking</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden md:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item: any) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(linkStyles({ color: pathname === item.href ? 'primary' : 'foreground' }), 'data-[active=true]:text-primary data-[active=true]:font-medium')}
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
                <div className="hidden sm:inline-flex gap-1">
                    <NavbarItem className="hidden lg:flex mx-1">
                        <Search />
                    </NavbarItem>
                    <NavbarItem className="hidden md:flex items-center gap-2">
                        <ThemeSwitch className="p-1 border border-gray-600 dark:border-primary rounded-full" size="sm" />
                        <LocaleSwitch />
                        <UserProfileDropdown profile={profile} />
                    </NavbarItem>
                </div>
            </NavbarContent>

            <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
                <UserProfileDropdown profile={profile} />
            </NavbarContent>

            <NavbarMenu className="pt-24 pb-4 flex flex-col justify-between">
                <div>
                    <Search />
                    <div className="mx-4 mt-2 flex flex-col gap-2">
                        {siteConfig.navItems.map((item: any, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <NextLink onClick={() => setIsMenuOpen(false)} className={clsx(linkStyles({ color: pathname === item.href ? 'primary' : 'foreground' }))} href={item.href}>
                                    {item.label}
                                </NextLink>
                            </NavbarMenuItem>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <ThemeSwitch />
                    <LocaleSwitch />
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};

export default ClientHeader;
