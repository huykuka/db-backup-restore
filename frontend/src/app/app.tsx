
import {ThemeProvider} from "./components";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@frontend/shared/components/ui/accordion";
export function App() {
  return (
    <div>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </ThemeProvider>
    </div>
  );
}

export default App;
