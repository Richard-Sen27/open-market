import NavTitle from "@/components/NavTitle"

import PurchasesList from '@/components/PurchasesList'

export default function Page() {
    return (
        <div>
            <NavTitle title="Profile" />
            <div className="p-6">
				<PurchasesList />
            </div>
        </div>
    )
}