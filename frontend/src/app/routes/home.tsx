import { Separator } from "@frontend/shared/components/ui/separator";
import { HistoryComponent } from "../components/history/history";
import Settings from "../components/settings/settings";


const Home = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">

                <div className="md:col-span-1">
                    <Settings />
                </div>

                <div className="block md:hidden">
                    <Separator />
                </div>

                <div className="md:col-span-2">
                    <HistoryComponent />
                </div>
            </div>
        </div>
    );
};

export default Home;