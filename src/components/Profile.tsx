"use client"

import { getCsrfToken, signIn, useSession, signOut } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useChainId, useDisconnect } from 'wagmi'
import { SiweMessage } from "siwe";
import { injected } from 'wagmi/connectors'
import Identicon from '@/components/Identicons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown';
import { usePathname, useRouter } from 'next/navigation';
import { useDarkMode, useIsClient } from 'usehooks-ts'
import Link from 'next/link';

export default function Profile() {
	const { connectAsync } = useConnect()
	const { disconnectAsync } = useDisconnect()

	const router = useRouter()
	const pathname = usePathname()

	const session = useSession()
	const chainId = useChainId()

	const { isConnected, address } = useAccount()
	const { signMessageAsync } = useSignMessage()

	const { isDarkMode, toggle, enable, disable } = useDarkMode({ localStorageKey: 'theme' })

	if (!useIsClient()) return null

	const handleLogin = async () => {
		try {
			await connectAsync({ connector: injected() })

			const message = new SiweMessage({
				domain: window.location.host,
				address: address,
				statement: 'Sign in with Ethereum to the app.',
				uri: window.location.origin,
				version: '1',
				chainId: chainId,
				nonce: await getCsrfToken(),
			})

			const signature = await signMessageAsync({ message: message.prepareMessage() })
			signIn('credentials', {
				message: JSON.stringify(message),
				redirect: false,
				signature,
				callbackUrl: pathname
			})
		} catch (error) {
			console.log(error)
			window.alert(error)
		}
	}

	const handleLogout = async () => {
		await disconnectAsync()
		await signOut()
	}

	return (
		<div>
			{
				!isConnected ? (
					<button type='button' onClick={handleLogin}>
						Sign In
					</button>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Identicon string={address} size={400} className="w-8 h-8 rounded-full" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Link href="/profile">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => toggle()}
								>
									{isDarkMode ? "Light Mode" : "Dark Mode"}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogout}>
									Sign out
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}
		</div>
	)
}