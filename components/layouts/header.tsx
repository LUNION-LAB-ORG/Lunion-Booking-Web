'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import IconMenu from '@/components/icon/icon-menu';
import IconCalendar from '@/components/icon/icon-calendar';
import IconEdit from '@/components/icon/icon-edit';
import IconChatNotification from '@/components/icon/icon-chat-notification';
import IconSearch from '@/components/icon/icon-search';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMenuApps from '@/components/icon/menu/icon-menu-apps';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages';
import IconMenuMore from '@/components/icon/menu/icon-menu-more';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import ThemeSwitch from './themeSwitch';
import LocaleSwitch from './localeSwitch';
import MessageList from './messageList';
import NotificationList from './notificationList';
import { Icone } from '../icons';
const Header = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { t } = getTranslation();

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [pathname]);

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const [search, setSearch] = useState(false);

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <Icone />
                            <p className="hidden sm:inline-block font-bold text-inherit">Lunion-Booking</p>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconMenu className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="hidden ltr:mr-2 rtl:ml-2 sm:block">
                        <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <li>
                                <Link
                                    href="/template/apps/calendar"
                                    className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                                >
                                    <IconCalendar />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/template/apps/todolist"
                                    className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                                >
                                    <IconEdit />
                                </Link>
                            </li>
                            <li>
                                <Link href="/template/apps/chat" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
                                    <IconChatNotification />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <form
                                className={`${search && '!block'} absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                                        placeholder="Search..."
                                    />
                                    <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
                                        <IconSearch className="mx-auto" />
                                    </button>
                                    <button type="button" className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden" onClick={() => setSearch(false)}>
                                        <IconXCircle />
                                    </button>
                                </div>
                            </form>
                            <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
                            >
                                <IconSearch className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
                            </button>
                        </div>
                        <ThemeSwitch />
                        <LocaleSwitch />
                        <MessageList />
                        <NotificationList />
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#3f121a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDashboard className="shrink-0" />
                                <span className="px-1">{t('dashboard')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/">{t('sales')}</Link>
                            </li>
                            <li>
                                <Link href="/template/analytics">{t('analytics')}</Link>
                            </li>
                            <li>
                                <Link href="/template/finance">{t('finance')}</Link>
                            </li>
                            <li>
                                <Link href="/template/crypto">{t('crypto')}</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuApps className="shrink-0" />
                                <span className="px-1">{t('apps')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/template/apps/chat">{t('chat')}</Link>
                            </li>
                            <li>
                                <Link href="/template/apps/mailbox">{t('mailbox')}</Link>
                            </li>
                            <li>
                                <Link href="/template/apps/todolist">{t('todo_list')}</Link>
                            </li>
                            <li>
                                <Link href="/template/apps/notes">{t('notes')}</Link>
                            </li>
                            <li>
                                <Link href="/template/apps/scrumboard">{t('scrumboard')}</Link>
                            </li>
                            <li>
                                <Link href="/template/apps/contacts">{t('contacts')}</Link>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('invoice')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/apps/invoice/list">{t('list')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/apps/invoice/preview">{t('preview')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/apps/invoice/add">{t('add')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/apps/invoice/edit">{t('edit')}</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/template/apps/calendar">{t('calendar')}</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuComponents className="shrink-0" />
                                <span className="px-1">{t('components')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/template/components/tabs">{t('tabs')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/accordions">{t('accordions')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/modals">{t('modals')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/cards">{t('cards')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/carousel">{t('carousel')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/countdown">{t('countdown')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/counter">{t('counter')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/sweetalert">{t('sweet_alerts')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/timeline">{t('timeline')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/notifications">{t('notifications')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/media-object">{t('media_object')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/list-group">{t('list_group')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/pricing-table">{t('pricing_tables')}</Link>
                            </li>
                            <li>
                                <Link href="/template/components/lightbox">{t('lightbox')}</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuElements className="shrink-0" />
                                <span className="px-1">{t('elements')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/template/elements/alerts">{t('alerts')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/avatar">{t('avatar')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/badges">{t('badges')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/breadcrumbs">{t('breadcrumbs')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/buttons">{t('buttons')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/buttons-group">{t('button_groups')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/color-library">{t('color_library')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/dropdown">{t('dropdown')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/infobox">{t('infobox')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/jumbotron">{t('jumbotron')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/loader">{t('loader')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/pagination">{t('pagination')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/popovers">{t('popovers')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/progress-bar">{t('progress_bar')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/search">{t('search')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/tooltips">{t('tooltips')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/treeview">{t('treeview')}</Link>
                            </li>
                            <li>
                                <Link href="/template/elements/typography">{t('typography')}</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDatatables className="shrink-0" />
                                <span className="px-1">{t('tables')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/template/tables">{t('tables')}</Link>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('datatables')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/datatables/basic">{t('basic')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/advanced">{t('advanced')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/skin">{t('skin')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/order-sorting">{t('order_sorting')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/multi-column">{t('multi_column')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/multiple-tables">{t('multiple_tables')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/alt-pagination">{t('alt_pagination')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/checkbox">{t('checkbox')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/range-search">{t('range_search')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/export">{t('export')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/datatables/column-chooser">{t('column_chooser')}</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuForms className="shrink-0" />
                                <span className="px-1">{t('forms')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/template/forms/basic">{t('basic')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/input-group">{t('input_group')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/layouts">{t('layouts')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/validation">{t('validation')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/input-mask">{t('input_mask')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/select2">{t('select2')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/touchspin">{t('touchspin')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/checkbox-radio">{t('checkbox_and_radio')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/switches">{t('switches')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/wizards">{t('wizards')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/file-upload">{t('file_upload')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/quill-editor">{t('quill_editor')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/markdown-editor">{t('markdown_editor')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/date-picker">{t('date_and_range_picker')}</Link>
                            </li>
                            <li>
                                <Link href="/template/forms/clipboard">{t('clipboard')}</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuPages className="shrink-0" />
                                <span className="px-1">{t('pages')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li className="relative">
                                <button type="button">
                                    {t('users')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/users/profile">{t('profile')}</Link>
                                    </li>
                                    <li>
                                        <Link href="/template/users/user-account-settings">{t('account_settings')}</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/template/pages/knowledge-base">{t('knowledge_base')}</Link>
                            </li>
                            <li>
                                <Link href="/template/pages/contact-us-boxed" target="_blank">
                                    {t('contact_us_boxed')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/template/pages/contact-us-cover" target="_blank">
                                    {t('contact_us_cover')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/template/pages/faq">{t('faq')}</Link>
                            </li>
                            <li>
                                <Link href="/template/pages/coming-soon-boxed" target="_blank">
                                    {t('coming_soon_boxed')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/template/pages/coming-soon-cover" target="_blank">
                                    {t('coming_soon_cover')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/template/pages/maintenence" target="_blank">
                                    {t('maintenence')}
                                </Link>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('error')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/pages/error404" target="_blank">
                                            {t('404')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/template/pages/error500" target="_blank">
                                            {t('500')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/template/pages/error503" target="_blank">
                                            {t('503')}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('login')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/auth/cover-login" target="_blank">
                                            {t('login_cover')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/template/auth/boxed-signin" target="_blank">
                                            {t('login_boxed')}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('register')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/auth/cover-register" target="_blank">
                                            {t('register_cover')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/template/auth/boxed-signup" target="_blank">
                                            {t('register_boxed')}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('password_recovery')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/auth/cover-password-reset" target="_blank">
                                            {t('recover_id_cover')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/template/auth/boxed-password-reset" target="_blank">
                                            {t('recover_id_boxed')}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative">
                                <button type="button">
                                    {t('lockscreen')}
                                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                    <li>
                                        <Link href="/template/auth/cover-lockscreen" target="_blank">
                                            {t('unlock_cover')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/template/auth/boxed-lockscreen" target="_blank">
                                            {t('unlock_boxed')}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuMore className="shrink-0" />
                                <span className="px-1">{t('more')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/template/dragndrop">{t('drag_and_drop')}</Link>
                            </li>
                            <li>
                                <Link href="/template/charts">{t('charts')}</Link>
                            </li>
                            <li>
                                <Link href="/template/font-icons">{t('font_icons')}</Link>
                            </li>
                            <li>
                                <Link href="/template/widgets">{t('widgets')}</Link>
                            </li>
                            <li>
                                <Link href="https://vristo.sbthemes.com" target="_blank">
                                    {t('documentation')}
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
