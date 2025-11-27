import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Palette,
    Save,
    Moon,
    Sun,
    Monitor
} from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

export default function SettingsPage() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const [accountSettings, setAccountSettings] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Acme Inc.',
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        weeklyReports: true,
        churnAlerts: true,
        revenueUpdates: false,
    });

    const handleSaveAccount = () => {
        toast.success('Account settings saved successfully!');
    };

    const handleSaveNotifications = () => {
        toast.success('Notification preferences saved!');
    };

    return (
        <div className="flex min-h-screen bg-background">
            <div className="hidden lg:block">
                <Sidebar
                    isCollapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                        <Sidebar isCollapsed={false} onToggle={() => setMobileMenuOpen(false)} />
                    </div>
                </>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    title="Settings"
                    subtitle="Manage your account preferences and application settings."
                    onMenuClick={() => setMobileMenuOpen(true)}
                    showMobileMenu
                />

                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl"
                    >
                        <Tabs defaultValue="account" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                                <TabsTrigger value="account" className="gap-2">
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">Account</span>
                                </TabsTrigger>
                                <TabsTrigger value="appearance" className="gap-2">
                                    <Palette className="h-4 w-4" />
                                    <span className="hidden sm:inline">Appearance</span>
                                </TabsTrigger>
                                <TabsTrigger value="notifications" className="gap-2">
                                    <Bell className="h-4 w-4" />
                                    <span className="hidden sm:inline">Notifications</span>
                                </TabsTrigger>
                                <TabsTrigger value="privacy" className="gap-2">
                                    <Shield className="h-4 w-4" />
                                    <span className="hidden sm:inline">Privacy</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Account Settings */}
                            <TabsContent value="account">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-xl border border-border bg-card p-6 space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-1">Account Information</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Update your account details and personal information.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={accountSettings.name}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={accountSettings.email}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company Name</Label>
                                            <Input
                                                id="company"
                                                value={accountSettings.company}
                                                onChange={(e) => setAccountSettings({ ...accountSettings, company: e.target.value })}
                                                placeholder="Enter your company name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">Change Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Enter new password"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Leave blank to keep your current password
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-border">
                                        <Button onClick={handleSaveAccount} className="gap-2">
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </motion.div>
                            </TabsContent>

                            {/* Appearance Settings */}
                            <TabsContent value="appearance">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-xl border border-border bg-card p-6 space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-1">Appearance</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Customize how the application looks and feels.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-base mb-4 block">Theme Preference</Label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <button
                                                    onClick={() => setTheme('light')}
                                                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${theme === 'light'
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <Sun className="h-5 w-5" />
                                                    <div className="text-left">
                                                        <div className="font-medium">Light</div>
                                                        <div className="text-xs text-muted-foreground">Bright theme</div>
                                                    </div>
                                                </button>

                                                <button
                                                    onClick={() => setTheme('dark')}
                                                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${theme === 'dark'
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <Moon className="h-5 w-5" />
                                                    <div className="text-left">
                                                        <div className="font-medium">Dark</div>
                                                        <div className="text-xs text-muted-foreground">Dark theme</div>
                                                    </div>
                                                </button>

                                                <button
                                                    onClick={() => setTheme('system')}
                                                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${theme === 'system'
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <Monitor className="h-5 w-5" />
                                                    <div className="text-left">
                                                        <div className="font-medium">System</div>
                                                        <div className="text-xs text-muted-foreground">Auto theme</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </TabsContent>

                            {/* Notification Settings */}
                            <TabsContent value="notifications">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-xl border border-border bg-card p-6 space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-1">Notifications</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Configure how and when you receive notifications.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="email-notifications" className="text-base">
                                                    Email Notifications
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive email updates about your account activity
                                                </p>
                                            </div>
                                            <Switch
                                                id="email-notifications"
                                                checked={notificationSettings.emailNotifications}
                                                onCheckedChange={(checked) =>
                                                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="weekly-reports" className="text-base">
                                                    Weekly Reports
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Get weekly summaries of your analytics data
                                                </p>
                                            </div>
                                            <Switch
                                                id="weekly-reports"
                                                checked={notificationSettings.weeklyReports}
                                                onCheckedChange={(checked) =>
                                                    setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="churn-alerts" className="text-base">
                                                    Churn Alerts
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Alert me when churn rate exceeds threshold
                                                </p>
                                            </div>
                                            <Switch
                                                id="churn-alerts"
                                                checked={notificationSettings.churnAlerts}
                                                onCheckedChange={(checked) =>
                                                    setNotificationSettings({ ...notificationSettings, churnAlerts: checked })
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="revenue-updates" className="text-base">
                                                    Revenue Updates
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Daily notifications about revenue changes
                                                </p>
                                            </div>
                                            <Switch
                                                id="revenue-updates"
                                                checked={notificationSettings.revenueUpdates}
                                                onCheckedChange={(checked) =>
                                                    setNotificationSettings({ ...notificationSettings, revenueUpdates: checked })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-border">
                                        <Button onClick={handleSaveNotifications} className="gap-2">
                                            <Save className="h-4 w-4" />
                                            Save Preferences
                                        </Button>
                                    </div>
                                </motion.div>
                            </TabsContent>

                            {/* Privacy Settings */}
                            <TabsContent value="privacy">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-xl border border-border bg-card p-6 space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-1">Data & Privacy</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Manage your data and privacy settings.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-lg border border-border space-y-3">
                                            <h4 className="font-medium text-foreground">Data Retention</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Your analytics data is stored securely and retained for 12 months. Historical data older than this is automatically archived.
                                            </p>
                                            <Button variant="outline" size="sm">
                                                Export My Data
                                            </Button>
                                        </div>

                                        <div className="p-4 rounded-lg border border-border space-y-3">
                                            <h4 className="font-medium text-foreground">Data Collection</h4>
                                            <p className="text-sm text-muted-foreground">
                                                We collect usage data to improve our service. This includes page views, feature usage, and performance metrics.
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5 space-y-3">
                                            <h4 className="font-medium text-destructive">Delete Account</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Permanently delete your account and all associated data. This action cannot be undone.
                                            </p>
                                            <Button variant="destructive" size="sm">
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
