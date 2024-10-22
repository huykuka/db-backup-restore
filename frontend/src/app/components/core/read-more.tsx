import { Button } from "@frontend/shared/components/ui/button"
import { useState } from "react"

interface ReadMoreProps {
    text: string
    limit?: number
}

export default function ReadMore({ text, limit = 300 }: ReadMoreProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded)
    }

    if (text.length <= limit) {
        return <p>{text}</p>
    }

    const displayText = isExpanded ? text : text.slice(0, limit)

    return (
        <div className="space-y-2" onClick={toggleReadMore}>
            <p>
                {displayText}
                {!isExpanded && "..."}
            </p>
            <Button
                variant="link"
                onClick={toggleReadMore}
                className="p-0 h-auto font-semibold text-primary underline"
            >
                {isExpanded ? "Read Less" : "Read More"}
            </Button>
        </div>
    )
}