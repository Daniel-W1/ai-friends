import SettingsButton from "@/components/settings-button"
import { Separator } from "@/components/ui/separator"
import { checkSubscription } from "@/lib/subscription"

const Settings = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="pl-10 pr-5 pt-5">
        <h1
            className="text-2xl font-semibold text-primary"
        >Settings</h1>

        <Separator className='my-2 bg-primary/10' />

        <p
            className="text-primary/50 text-sm mb-4"
        >
            Tailor your user experience with ease. Modify, upgrade, or cancel your subscriptions, 
            and adjust notification preferences effortlessly. Your subscription, your way.
        </p>
        <SettingsButton isPro={isPro}/>
    </div>
  )
}

export default Settings