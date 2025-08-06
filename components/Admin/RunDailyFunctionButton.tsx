"use client"

import { Button } from "../ui/button";

export default function RunDailyFunctionButton() {
    return (
        <Button
            onClick={async () => {
                try {
                    const response = await fetch('/api/cron/daily');
                    if (!response.ok) {
                        console.error('Error running daily function:', response.statusText);
                    } else {
                        console.log('Daily function executed successfully');
                    }
                } catch (error) {
                    console.error('Error executing daily function:', error);
                }
            }}
        >
            Run Daily Function
        </Button>
    )
}