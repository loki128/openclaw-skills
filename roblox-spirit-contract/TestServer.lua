-- ULTRA SIMPLE TEST - Server
-- Place in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Create remote
local TestEvent = Instance.new("RemoteEvent")
TestEvent.Name = "TestEvent"
TestEvent.Parent = ReplicatedStorage

-- Create a part with ProximityPrompt
local part = Instance.new("Part")
part.Size = Vector3.new(5, 5, 5)
part.Position = Vector3.new(0, 5, 0)
part.Color = Color3.fromRGB(255, 0, 0)
part.Anchored = true
part.Parent = workspace

local prompt = Instance.new("ProximityPrompt")
prompt.ActionText = "TEST"
prompt.ObjectText = "Click Me"
prompt.HoldDuration = 0.5
prompt.MaxActivationDistance = 20
prompt.Parent = part

prompt.Triggered:Connect(function(player)
	print("SERVER: Prompt triggered by " .. player.Name)
	TestEvent:FireClient(player, "HELLO FROM SERVER")
	print("SERVER: Fired to client")
end)

print("SERVER READY - Walk to red block, hold E")