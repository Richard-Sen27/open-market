import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Ethereum",
			credentials: {
				message: {
					label: 'Message',
					type: 'text',
					placeholder: '0x0',
				},
				signature: {
					label: 'Signature',
					type: 'text',
					placeholder: '0x0',
				},		  
			},
			async authorize(credentials: any, request: Request) {
				try {
					if (!process.env.NEXTAUTH_URL) {
						throw 'NEXTAUTH_URL is not set'
					}

					const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))
					const nextAuthUrl = new URL(process.env.NEXTAUTH_URL)
					if (siwe.domain !== nextAuthUrl.host) {
						return null
					}

					if (siwe.nonce !== (await getCsrfToken())) {
						return null
					}

					await siwe.validate(credentials?.signature || '')
					return {
						id: siwe.address,
					}
				} catch (e) {
					return null
				}		  
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token }) {
			// session.address = token.sub
			session.user!.name = token.sub
			return session
		}
	}
})

export { handler as GET, handler as POST }