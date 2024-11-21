'use client';

import React, { useState } from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import Link from 'next/link';
import { IconCalendar, IconHeart, IconHelpCircle, IconLogout, IconMessageCircle2, IconSettings, IconHome } from '@tabler/icons-react';
import Image from 'next/image';

import { signOut } from '@/src/actions/auth.actions';
import ThemeSwitch from '../layouts/themeSwitch';
import { Profile } from '@/types/models';

export default function UserProfileDropdown({ profile }: { profile: Profile | null }) {
    const [pending, setPending] = useState(false);

    return (
        <>
            {profile ? (
                <Dropdown
                    classNames={{
                        base: 'before:bg-default-200', // change arrow background
                        content: 'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
                    }}
                >
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            showFallback
                            as="button"
                            className="transition-transform"
                            color="primary"
                            name={profile.first_name?.slice(0, 1)?.toUpperCase() + '' + profile.last_name?.slice(0, 1).toUpperCase()}
                            size="sm"
                            src={profile.avatar_url!}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" variant="light">
                            <div className="flex flex-col gap-2 p-1">
                                <div className="flex gap-2 items-center">
                                    <Avatar
                                        showFallback
                                        as="button"
                                        className="transition-transform"
                                        name={profile.first_name?.slice(0, 1)?.toUpperCase() + '' + profile.last_name?.slice(0, 1).toUpperCase()}
                                        size="sm"
                                        src={profile.avatar_url!}
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">{profile.first_name + ' ' + profile.last_name}</p>
                                        <p className="text-xs">{profile.email}</p>
                                    </div>
                                    {/* <ThemeSwitch className="p-1 border border-dashed border-gray-600 dark:border-primary rounded-full absolute top-0 right-0" size="sm" /> */}
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <Button as={Link} href='/settings' size="sm" startContent={<IconSettings size={16} />} variant="ghost">
                                        Paramètres
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        startContent={<IconLogout size={16} />}
                                        variant="ghost"
                                        onClick={async () => {
                                            setPending(true);
                                            await signOut();
                                            setPending(false);
                                        }}
                                    >
                                        Déconnexion
                                    </Button>
                                </div>
                            </div>
                        </DropdownItem>
                        <DropdownSection showDivider title={'Mode voyageur'}>
                            <DropdownItem key="home" as={Link} href="/" startContent={<IconHome size={16} />}>
                                Accueil
                            </DropdownItem>
                            <DropdownItem key="favorite" startContent={<IconHeart size={16} />}>
                                Mes favoris
                            </DropdownItem>
                            <DropdownItem key="message" startContent={<IconMessageCircle2 size={16} />}>
                                Message
                            </DropdownItem>
                            <DropdownItem key="booking" startContent={<IconCalendar size={16} />}>
                                Réservation
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection showDivider title={'Mode hôte'}>
                            <DropdownItem key="workspaces" as={Link} href="/workspaces" startContent={<Image alt="workspace" height={18} src={'/assets/images/workspace.png'} width={18} />}>
                                Espace de travail
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection title={'Aides et sécurité'}>
                            <DropdownItem key="help_and_feedback" startContent={<IconHelpCircle size={16} />}>
                                Aide & Feedback
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Button as={Link} color="primary" href={'/auth'} isLoading={pending} onClick={() => setPending(true)}>
                    Connexion
                </Button>
            )}
        </>
    );
}
