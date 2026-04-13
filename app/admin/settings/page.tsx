'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings as SettingsIcon, Mail, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    'We are currently performing maintenance. We will be back soon.'
  );

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">System Settings</h2>
        <p className="text-muted-foreground">Manage system-wide configuration</p>
      </div>

      {/* Maintenance Mode */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <SettingsIcon className="text-primary" size={24} />
            <div>
              <h3 className="font-semibold">Maintenance Mode</h3>
              <p className="text-sm text-muted-foreground">
                Put the application in maintenance mode
              </p>
            </div>
          </div>
          <Switch
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
          />
        </div>

        {maintenanceMode && (
          <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <label className="block text-sm font-medium mb-2">
              Maintenance Message
            </label>
            <Textarea
              value={maintenanceMessage}
              onChange={e => setMaintenanceMessage(e.target.value)}
              placeholder="Message to show during maintenance"
              rows={3}
            />
          </div>
        )}
      </Card>

      {/* Email Notifications */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Mail className="text-primary" size={24} />
            <div>
              <h3 className="font-semibold">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Send email notifications for important events
              </p>
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </Card>

      {/* Analytics */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-primary" size={24} />
            <div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Enable usage analytics and monitoring
              </p>
            </div>
          </div>
          <Switch
            checked={analyticsEnabled}
            onCheckedChange={setAnalyticsEnabled}
          />
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-2">
        <Button onClick={handleSave} className="gap-2">
          <SettingsIcon size={20} />
          Save Settings
        </Button>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-blue-500/10 border-blue-500/30">
        <h3 className="font-semibold mb-2">System Information</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Database:</strong> Firebase Firestore
          </p>
          <p>
            <strong>Authentication:</strong> Firebase Auth
          </p>
          <p>
            <strong>Deployment:</strong> Vercel
          </p>
        </div>
      </Card>
    </div>
  );
}
