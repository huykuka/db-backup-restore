
import { Card, CardContent, CardHeader, CardTitle } from '@frontend/shared/components/ui/card'
import { Progress } from '@frontend/shared/components/ui/progress'
import { AlertCircle, CheckCircle, Database } from 'lucide-react'
import { useEffect, useState } from 'react'
import backupHistoryService, { useBackupHistory } from '../history/backup-history/backup-history.service'

interface BackupData {
    count: number
    latestBackup: string
    health: number
}

export default function Widget() {
    useBackupHistory()

    const [backupData, setBackupData] = useState<BackupData>({
        count: 0,
        latestBackup: '',
        health: 0
    })

    useEffect(() => {
        // Simulate fetching backup data
        const fetchBackupData = () => {
            // This is where you would normally fetch data from your API
            const simulatedData: BackupData = {
                count: Math.floor(Math.random() * 10) + 1, // Random number of backups between 1 and 10
                latestBackup: new Date(backupHistoryService.getState().backups[1]?.createdAt).toLocaleString(), // Today's date
                health: 100 // Random health percentage
            }
            setBackupData(simulatedData)
        }

        fetchBackupData()
        // Set up an interval to fetch data every 5 minutes (300000 ms)
        const interval = setInterval(fetchBackupData, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="w-fit h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database Backups</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold whitespace-nowrap">{backupHistoryService.getState().total} Backups Available</div>
                <p className="text-xs text-muted-foreground">Last backup: {backupData.latestBackup} </p>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">Backup Health</p>
                        <span className="text-sm font-bold">{backupData.health}%</span>
                    </div>
                    <Progress value={backupData.health} className="mt-2" />
                </div>
                <div className="mt-4 flex items-center">
                    {backupData.health > 70 ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    )}
                    <span className="text-sm">
                        {backupData.health > 70 ? 'Backups are healthy' : 'Attention needed'}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}