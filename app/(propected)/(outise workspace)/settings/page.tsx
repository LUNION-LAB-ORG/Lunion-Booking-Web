import { title } from '@/components/primitives';
import UsersAccountSettingsTabs from '@/components/settings/users-account-settings-tabs';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Account Setting',
};

const UserAccountSettings = () => {
    return (
        <div className="container pt-5">
               <div className="mb-5 flex items-center justify-between">
                <h5 className={title()}>Paramètres</h5>
            </div>
            <UsersAccountSettingsTabs />
        </div>
    );
};

export default UserAccountSettings;
