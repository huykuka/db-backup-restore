
import {ThemeProvider} from "./components";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@frontend/shared/components/ui/accordion";
import {ModeToggle} from "./components/mode-toggle";
import {Button} from "@frontend/shared/components/ui/button";
export function App() {
  return (
    <div>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ModeToggle />
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button>Button</Button>
        </ThemeProvider>
    </div>
  );
}

export default App;
