'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 py-16 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Port2Port</h1>
              <p className="text-gray-600">Shipping made simple</p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In */}
              <TabsContent value="signin">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="w-full border border-gray-300"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold">
                    Sign In
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Forgot password?{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Reset here
                    </a>
                  </p>
                </form>
              </TabsContent>

              {/* Sign Up */}
              <TabsContent value="signup">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="w-full border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="w-full border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="w-full border border-gray-300"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link href="/" className="text-center block text-sm text-primary hover:underline">
                Back to Home
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
