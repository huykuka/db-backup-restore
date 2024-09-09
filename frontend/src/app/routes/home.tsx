import React from 'react';
import Settings from "../components/settings/settings";
import {Histories} from "../components/histories/histories";
import {Separator} from "@frontend/shared/components/ui/separator";

const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            <div className="md:col-span-1">
                <Settings/>
            </div>

            <div className="block md:hidden">
                <Separator/>
            </div>

            <div className="md:col-span-2">
                <Histories/>
            </div>
        </div>
    );
};

export default Home;