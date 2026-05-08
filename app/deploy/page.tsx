/**
 * @purpose Deploy page - deploy ConnectOnion agents to production
 * @context Shows how to deploy agents to Docker, GCP, AWS, and other platforms
 * @llm-note Progressive tutorial: 60s start -> Docker -> Cloud providers -> Best practices
 */

'use client'

import { HiOutlineArrowUpTray, HiOutlineArrowRight, HiOutlineBolt, HiOutlineServer, HiOutlineCloud, HiOutlineShieldCheck, HiOutlineCheck, HiOutlineCommandLine, HiOutlineCodeBracket, HiOutlineSquare3Stack3D, HiOutlineGlobeAlt, HiOutlineCube, HiOutlineCog6Tooth } from 'react-icons/hi2'
import Link from 'next/link'
import CodeWithResult from '../../components/CodeWithResult'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function DeployPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Getting Started', href: '/' },
            { label: 'Deploy' },
          ]}
          icon={HiOutlineArrowUpTray}
          iconColor="icon-ui"
          title="Deploy"
          description="Deploy your ConnectOnion agents to production. Docker, GCP, AWS - your choice."
          badge={<span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full border border-gray-200">Beta</span>}
        />

        {/* Key Benefit */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Why deploy?</strong> Run agents 24/7, scale horizontally, integrate with existing infrastructure. Your agents become production services.
            </p>
          </div>
        </section>

        {/* Two Options */}
        <section className="mb-20">
          <h2 className="heading-2">Two Deployment Options</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-900 rounded-lg p-6 relative">
              <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded">
                Recommended
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineCloud className="w-6 h-6" />
                co deploy
              </h3>
              <p className="text-gray-700 mb-4">
                Quick deployment to ConnectOnion Cloud. Managed hosting, no infrastructure to manage.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>One command deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Automatic HTTPS</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Re-deploy updates same URL</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineServer className="w-6 h-6" />
                Self-Host
              </h3>
              <p className="text-gray-700 mb-4">
                Full control with your own infrastructure. Use Docker, GCP, AWS, or any VPS.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 icon-ui mt-0.5" />
                  <span>Full control</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 icon-ui mt-0.5" />
                  <span>Custom domains</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 icon-ui mt-0.5" />
                  <span>Compliance requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 60-Second Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">60-Second Quick Start</h2>

          <p className="text-gray-700 mb-6 text-lg">
            Deploy your agent with the CLI - one command:
          </p>

          <CodeWithResult
            code={`# Create an agent project
co create my-agent

# Navigate to the project
cd my-agent

# Deploy to ConnectOnion Cloud
co deploy`}
            result={`Deploying to ConnectOnion Cloud...

  Project: my-agent
  Secrets: 3 keys

Uploading...
Building...

Deployed!
Agent URL: https://my-agent-abc123.agents.openonion.ai`}
            language="bash"
            fileName="Terminal"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">co deploy Requirements</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span>Git repository with committed code</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span><code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">.co/host.yaml</code> (created by <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co create</code> or <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co init</code>)</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span>Authenticated (<code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co auth</code>)</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Configuration</h3>
            <CodeWithResult
              code={`# .co/host.yaml
name: my-agent
entrypoint: agent.py
env: .env`}
              language="yaml"
              fileName=".co/host.yaml"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Secrets</h3>
            <p className="text-gray-700 mb-4">
              Secrets from <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">.env</code> are securely passed to your agent:
            </p>
            <CodeWithResult
              code={`# .env
OPENAI_API_KEY=sk-xxx
DATABASE_URL=postgres://...`}
              language="bash"
              fileName=".env"
            />
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm">
              <strong>Note:</strong> URL format is <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">{'{project_name}-{your_address[:10]}.agents.openonion.ai'}</code>. Re-deploying updates the same URL.
            </p>
          </div>
        </section>

        {/* Self-Host paths guide */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 border-t border-dashed border-gray-200" />
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Self-Host Paths</span>
            <div className="flex-1 border-t border-dashed border-gray-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'VPS / bare metal', target: '#self-host-with-host', desc: 'Python + host()' },
              { label: 'Docker / container', target: '#docker-deployment', desc: 'Any Docker host' },
              { label: 'Google Cloud', target: '#deploy-to-google-cloud-run', desc: 'Cloud Run' },
              { label: 'AWS', target: '#deploy-to-aws', desc: 'EC2 or ECS' },
            ].map(({ label, target, desc }) => (
              <a key={label} href={target} className="group flex flex-col gap-1 p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm transition-all">
                <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">{label}</span>
                <span className="text-[11px] font-mono text-gray-400">{desc} →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Self-Host with host() */}
        <section className="mb-20" id="self-host-with-host">
          <h2 className="heading-2">
            <HiOutlineServer className="w-8 h-8 icon-ui" />
            Self-Host with host()
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Deploy to your own infrastructure using <code className="bg-gray-100 px-2 py-1 rounded">host()</code>:
          </p>

          <CodeWithResult
            code={`# agent.py
from connectonion import Agent, host

agent = Agent("my-agent", tools=[my_tool])

# Export ASGI app for uvicorn/gunicorn
app = host.app(agent)

if __name__ == "__main__":
    host(agent)`}
            language="python"
            fileName="agent.py"
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Run with uvicorn/gunicorn</h3>
            <CodeWithResult
              code={`# Direct
python agent.py

# Uvicorn
uvicorn agent:app --workers 4

# Gunicorn
gunicorn agent:app -w 4 -k uvicorn.workers.UvicornWorker`}
              language="bash"
            />
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm">
              For full API reference, see <Link href="/host" className="underline hover:text-gray-900">host() documentation</Link>.
            </p>
          </div>
        </section>

        {/* Docker Deployment */}
        <section className="mb-20" id="docker-deployment">
          <h2 className="heading-2">
            <HiOutlineCube className="w-8 h-8 icon-ui" />
            Docker Deployment
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            The simplest way to deploy - works anywhere Docker runs:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Create Your Agent</h3>
              <CodeWithResult
                code={`# agent.py
from connectonion import Agent, host

def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

agent = Agent(
    name="my-agent",
    tools=[search],
    system_prompt="You are a helpful assistant."
)

# Host the agent
host(agent)`}
                language="python"
                fileName="agent.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2. Dockerfile</h3>
              <CodeWithResult
                code={`FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy agent code
COPY agent.py .

# Run the agent
CMD ["python", "agent.py"]`}
                language="dockerfile"
                fileName="Dockerfile"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">3. Build & Run</h3>
              <CodeWithResult
                code={`# Build the image
docker build -t my-agent .

# Run with API key
docker run -d \\
  -e OPENAI_API_KEY=$OPENAI_API_KEY \\
  --name my-agent \\
  my-agent`}
                result={`Building image...
Successfully built a1b2c3d4e5f6
Successfully tagged my-agent:latest

Container started: my-agent
Agent serving at: 0x3d4017c3e843895a...`}
                language="bash"
                fileName="Terminal"
              />
            </div>
          </div>
        </section>

        {/* GCP Cloud Run */}
        <section className="mb-20" id="deploy-to-google-cloud-run">
          <h2 className="heading-2">
            <HiOutlineCloud className="w-8 h-8 icon-ui" />
            Deploy to Google Cloud Run
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Serverless deployment with automatic scaling:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Build & Push to Container Registry</h3>
              <CodeWithResult
                code={`# Authenticate with GCP
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/my-agent`}
                language="bash"
                fileName="Terminal"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2. Deploy to Cloud Run</h3>
              <CodeWithResult
                code={`gcloud run deploy my-agent \\
  --image gcr.io/YOUR_PROJECT_ID/my-agent \\
  --platform managed \\
  --region us-central1 \\
  --set-env-vars "OPENAI_API_KEY=sk-..." \\
  --allow-unauthenticated`}
                result={`Deploying container to Cloud Run service [my-agent]...
Done.

Service URL: https://my-agent-abc123-uc.a.run.app
Agent address: 0x3d4017c3e843895a92b70aa74d1b7ebc...`}
                language="bash"
                fileName="Terminal"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Note</h3>
              <p className="text-gray-700">
                Use <code className="bg-gray-100 px-2 py-1 rounded">Secret Manager</code> for API keys in production instead of environment variables.
              </p>
            </div>
          </div>
        </section>

        {/* AWS Deployment */}
        <section className="mb-20" id="deploy-to-aws">
          <h2 className="heading-2">
            <HiOutlineServer className="w-8 h-8 icon-ui" />
            Deploy to AWS
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Multiple options depending on your needs:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineServer className="w-5 h-5" />
                EC2 / Lightsail
              </h3>
              <p className="text-gray-700 mb-4">
                Simple VPS deployment. Best for always-on agents.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Full control over environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Predictable pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Easy SSH access</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineSquare3Stack3D className="w-5 h-5" />
                ECS / Fargate
              </h3>
              <p className="text-gray-700 mb-4">
                Container orchestration. Best for scaling.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Auto-scaling built in</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Load balancing</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Rolling deployments</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">EC2 Quick Deploy</h3>
            <CodeWithResult
              code={`# SSH to your EC2 instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install dependencies
sudo apt update && sudo apt install -y python3-pip docker.io

# Clone and run
git clone https://github.com/your/agent-repo.git
cd agent-repo
docker build -t my-agent .
docker run -d -e OPENAI_API_KEY=$OPENAI_API_KEY my-agent`}
              language="bash"
              fileName="Terminal"
            />
          </div>
        </section>

        {/* Environment Variables */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCog6Tooth className="w-8 h-8 text-gray-400" />
            Environment Variables
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Configure your agent for different environments:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Variable</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">OPENAI_API_KEY</td>
                  <td className="px-4 py-3 text-gray-700">OpenAI API key for GPT models</td>
                  <td className="px-4 py-3 text-gray-600">Yes*</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">ANTHROPIC_API_KEY</td>
                  <td className="px-4 py-3 text-gray-700">Anthropic API key for Claude</td>
                  <td className="px-4 py-3 text-gray-600">Optional</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">GOOGLE_API_KEY</td>
                  <td className="px-4 py-3 text-gray-700">Google API key for Gemini</td>
                  <td className="px-4 py-3 text-gray-600">Optional</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">RELAY_URL</td>
                  <td className="px-4 py-3 text-gray-700">Custom relay server URL</td>
                  <td className="px-4 py-3 text-gray-600">Optional</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">LOG_LEVEL</td>
                  <td className="px-4 py-3 text-gray-700">Logging verbosity (DEBUG, INFO, WARN)</td>
                  <td className="px-4 py-3 text-gray-600">Optional</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            * Or use ConnectOnion managed keys with <code className="bg-gray-100 px-2 py-1 rounded">co auth</code> - no API keys needed!
          </p>
        </section>

        {/* Best Practices */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-green-600" />
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Use secret managers for API keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Never commit <code className="bg-gray-100 px-1 rounded">.co/</code> or <code className="bg-gray-100 px-1 rounded">.env</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Use non-root container users</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Enable HTTPS for all endpoints</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reliability</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5" />
                  <span>Add health checks to containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5" />
                  <span>Set up automatic restarts</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5" />
                  <span>Configure logging and monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5" />
                  <span>Use persistent volumes for keys</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200 text-center">
            <h2 className="heading-2">Ready to Deploy?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Your agents are production-ready. Ship them!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/host"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <HiOutlineGlobeAlt className="w-5 h-5" />
                host() Reference
              </Link>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <HiOutlineCodeBracket className="w-5 h-5" />
                Connect to Agents
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
