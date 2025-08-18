import { redirect } from 'next/navigation';

export default async function VRDigitalTwinRedirect() {
  // Simple redirect to the English version
  redirect('/en/vr-digital-twin');
}