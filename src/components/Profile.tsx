"use client"

import { getCsrfToken, signIn, useSession, signOut } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useChainId } from 'wagmi'
import { SiweMessage } from "siwe";
import { injected } from 'wagmi/connectors'
import Identicon from '@/components/Identicons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown';
import { Button } from './ui/button';
import { useIsClient } from 'usehooks-ts';

export default function Profile() {
	const { connectAsync } = useConnect()
	const session = useSession()
	const chainId = useChainId()
	const { isConnected, address } = useAccount()
	const { signMessageAsync } = useSignMessage()

	const handleLogin = async () => {
		try {
			await connectAsync({ connector: injected() })
			const callbackUrl = '/protected'
			const message = new SiweMessage({
				domain: window.location.host,
				// address: accountData?.address,
				statement: 'Sign in with Ethereum to the app.',
				uri: window.location.origin,
				version: '1',
				chainId: chainId,
				nonce: await getCsrfToken(),
			})
			const data = await signMessageAsync({ message: message.prepareMessage() })
			console.log('signed message', data)

			const signature = await signMessageAsync({
				message: message.prepareMessage(),
			})
			signIn('credentials', {
				message: JSON.stringify(message),
				redirect: false,
				signature,
				callbackUrl,
			})
		} catch (error) {
			window.alert(error)
		}
	}

	const handleLogout = async () => {
		signOut()
	}

	if (!useIsClient()) return null

	return (
		<div>
			{
				!isConnected ? (
					<button onClick={handleLogin}>
						Sign In
					</button>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='focus:outline-none'>
								<Identicon string={"0xd7b6202152ff734176BCf36bc0D646547684B29d"} size={400} className="w-8 h-8 rounded-full" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									Profile
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