-- ULTRA SIMPLE TEST - Client
-- Place in StarterPlayerScripts as LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("CLIENT: Script starting...")

-- Wait for PlayerGui
local playerGui = player:WaitForChild("PlayerGui")
print("CLIENT: PlayerGui ready")

-- Get remote
local TestEvent = ReplicatedStorage:WaitForChild("TestEvent")
print("CLIENT: TestEvent ready")

-- Create simple UI
local gui = Instance.new("ScreenGui")
gui.Name = "TestGUI"
gui.Parent = playerGui

local button = Instance.new("TextButton")
button.Size = UDim2.new(0, 200, 0, 100)
button.Position = UDim2.new(0.5, -100, 0.5, -50)
button.BackgroundColor3 = Color3.fromRGB(0, 255, 0)
button.Text = "CONNECTION WORKS!"
button.TextColor3 = Color3.fromRGB(0, 0, 0)
button.Font = Enum.Font.GothamBlack
button.TextSize = 24
button.Visible = false
button.Parent = gui

print("CLIENT: UI created, waiting for server...")

-- Listen for server
TestEvent.OnClientEvent:Connect(function(message)
	print("CLIENT: Received message: " .. tostring(message))
	button.Visible = true
	print("CLIENT: Button should be VISIBLE")
end)

print("CLIENT: Ready - walk to red block and hold E")