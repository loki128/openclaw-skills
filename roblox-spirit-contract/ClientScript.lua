-- Client UI for Spirit Contract v3 - DEBUG VERSION
-- Place this in StarterPlayerScripts as a LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("=== CLIENT SCRIPT STARTING ===")

-- Wait for PlayerGui
local playerGui = player:WaitForChild("PlayerGui")
print("PlayerGui found")

-- Wait for remote event
local ContractEvent = ReplicatedStorage:WaitForChild("ContractEvent")
print("ContractEvent found")

-- Create UI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ContractUI"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui
print("ScreenGui created")

-- Simple backdrop
local backdrop = Instance.new("Frame")
backdrop.Size = UDim2.new(1, 0, 1, 0)
backdrop.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
backdrop.BackgroundTransparency = 0.6
backdrop.Visible = false
backdrop.Parent = screenGui

-- Contract frame
local contractFrame = Instance.new("Frame")
contractFrame.Size = UDim2.new(0, 400, 0, 300)
contractFrame.Position = UDim2.new(0.5, -200, 0.5, -150)
contractFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
contractFrame.BorderSizePixel = 0
contractFrame.Visible = false
contractFrame.Parent = screenGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = contractFrame

local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 100, 50)
stroke.Thickness = 2
stroke.Parent = contractFrame

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 40)
title.Position = UDim2.new(0, 0, 0, 10)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBold
title.TextSize = 24
title.Parent = contractFrame

-- Spirit name
local spiritName = Instance.new("TextLabel")
spiritName.Size = UDim2.new(1, 0, 0, 30)
spiritName.Position = UDim2.new(0, 0, 0, 50)
spiritName.BackgroundTransparency = 1
spiritName.Text = "TEST SPIRIT"
spiritName.TextColor3 = Color3.fromRGB(255, 100, 50)
spiritName.Font = Enum.Font.GothamBold
spiritName.TextSize = 20
spiritName.Parent = contractFrame

-- Strength
local strengthText = Instance.new("TextLabel")
strengthText.Size = UDim2.new(1, -40, 0, 60)
strengthText.Position = UDim2.new(0, 20, 0, 90)
strengthText.BackgroundTransparency = 1
strengthText.Text = "Strength: ..."
strengthText.TextColor3 = Color3.fromRGB(100, 255, 100)
strengthText.Font = Enum.Font.Gotham
strengthText.TextSize = 14
strengthText.TextWrapped = true
strengthText.Parent = contractFrame

-- Drawback
local drawbackText = Instance.new("TextLabel")
drawbackText.Size = UDim2.new(1, -40, 0, 60)
drawbackText.Position = UDim2.new(0, 20, 0, 150)
drawbackText.BackgroundTransparency = 1
drawbackText.Text = "Drawback: ..."
drawbackText.TextColor3 = Color3.fromRGB(255, 100, 100)
drawbackText.Font = Enum.Font.Gotham
drawbackText.TextSize = 14
drawbackText.TextWrapped = true
drawbackText.Parent = contractFrame

-- Accept button
local acceptBtn = Instance.new("TextButton")
acceptBtn.Size = UDim2.new(0, 150, 0, 40)
acceptBtn.Position = UDim2.new(0, 30, 1, -55)
acceptBtn.BackgroundColor3 = Color3.fromRGB(255, 100, 50)
acceptBtn.Text = "SIGN"
acceptBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
acceptBtn.Font = Enum.Font.GothamBold
acceptBtn.TextSize = 16
acceptBtn.Parent = contractFrame

local acceptCorner = Instance.new("UICorner")
acceptCorner.CornerRadius = UDim.new(0, 8)
acceptCorner.Parent = acceptBtn

-- Decline button
local declineBtn = Instance.new("TextButton")
declineBtn.Size = UDim2.new(0, 150, 0, 40)
declineBtn.Position = UDim2.new(1, -180, 1, -55)
declineBtn.BackgroundColor3 = Color3.fromRGB(60, 60, 70)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 16
declineBtn.Parent = contractFrame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 8)
declineCorner.Parent = declineBtn

print("UI created successfully")

-- Current spirit
local currentSpirit = nil

-- Listen for server event
print("Setting up OnClientEvent listener...")

ContractEvent.OnClientEvent:Connect(function(spiritKey, spiritData)
	print("=== CLIENT RECEIVED EVENT ===")
	print("SpiritKey: " .. tostring(spiritKey))
	print("SpiritData: " .. tostring(spiritData))
	
	if not spiritData then
		print("ERROR: No spirit data received!")
		return
	end
	
	currentSpirit = spiritKey
	
	-- Update UI
	spiritName.Text = spiritData.name or "UNKNOWN"
	strengthText.Text = "STRENGTH: " .. (spiritData.strength or "None")
	drawbackText.Text = "DRAWBACK: " .. (spiritData.drawback or "None")
	
	-- Update colors
	if spiritData.color then
		stroke.Color = spiritData.color
		spiritName.TextColor3 = spiritData.color
		acceptBtn.BackgroundColor3 = spiritData.color
	end
	
	-- Show UI
	backdrop.Visible = true
	contractFrame.Visible = true
	
	print("UI is now VISIBLE")
end)

-- Accept button
acceptBtn.MouseButton1Click:Connect(function()
	print("Accept clicked, spirit: " .. tostring(currentSpirit))
	if currentSpirit then
		ContractEvent:FireServer(currentSpirit, true)
		backdrop.Visible = false
		contractFrame.Visible = false
		print("Contract accepted, UI hidden")
	end
end)

-- Decline button
declineBtn.MouseButton1Click:Connect(function()
	print("Decline clicked")
	backdrop.Visible = false
	contractFrame.Visible = false
	currentSpirit = nil
end)

print("=== CLIENT SCRIPT FULLY LOADED ===")