-- Client UI for Spirit Contract v5 - PROPERLY WORKING
-- Place this in StarterPlayerScripts as a LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Get remote events from ReplicatedStorage
local ShowContract = ReplicatedStorage:WaitForChild("ShowContract")
local SignContract = ReplicatedStorage:WaitForChild("SignContract")

print("Client script loaded - waiting for events")

-- Create UI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ContractUI"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Backdrop
local backdrop = Instance.new("Frame")
backdrop.Size = UDim2.new(1, 0, 1, 0)
backdrop.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
backdrop.BackgroundTransparency = 0.7
backdrop.Visible = false
backdrop.Parent = screenGui

-- Main frame
local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 400, 0, 500)
frame.Position = UDim2.new(0.5, -200, 0.5, -250)
frame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
frame.BorderSizePixel = 0
frame.Visible = false
frame.Parent = screenGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = frame

local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 100, 50)
stroke.Thickness = 2
stroke.Parent = frame

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 40)
title.Position = UDim2.new(0, 0, 0, 10)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 28
title.Parent = frame

-- Spirit name
local spiritName = Instance.new("TextLabel")
spiritName.Size = UDim2.new(1, 0, 0, 35)
spiritName.Position = UDim2.new(0, 0, 0, 55)
spiritName.BackgroundTransparency = 1
spiritName.Text = "SPIRIT NAME"
spiritName.TextColor3 = Color3.fromRGB(255, 100, 50)
spiritName.Font = Enum.Font.GothamBold
spiritName.TextSize = 24
title.Parent = frame

-- Description
local desc = Instance.new("TextLabel")
desc.Size = UDim2.new(1, -30, 0, 60)
desc.Position = UDim2.new(0, 15, 0, 95)
desc.BackgroundTransparency = 1
desc.Text = "Description..."
desc.TextColor3 = Color3.fromRGB(200, 200, 200)
desc.Font = Enum.Font.Gotham
desc.TextSize = 14
desc.TextWrapped = true
desc.Parent = frame

-- Strength
local strengthHeader = Instance.new("TextLabel")
strengthHeader.Size = UDim2.new(1, -30, 0, 25)
strengthHeader.Position = UDim2.new(0, 15, 0, 165)
strengthHeader.BackgroundTransparency = 1
strengthHeader.Text = "STRENGTH:"
strengthHeader.TextColor3 = Color3.fromRGB(100, 255, 100)
strengthHeader.Font = Enum.Font.GothamBold
strengthHeader.TextSize = 16
strengthHeader.TextXAlignment = Enum.TextXAlignment.Left
strengthHeader.Parent = frame

local strengthText = Instance.new("TextLabel")
strengthText.Size = UDim2.new(1, -30, 0, 50)
strengthText.Position = UDim2.new(0, 15, 0, 190)
strengthText.BackgroundTransparency = 1
strengthText.Text = "Strength text..."
strengthText.TextColor3 = Color3.fromRGB(255, 255, 255)
strengthText.Font = Enum.Font.Gotham
strengthText.TextSize = 14
strengthText.TextWrapped = true
strengthText.TextXAlignment = Enum.TextXAlignment.Left
strengthText.Parent = frame

-- Drawback
local drawbackHeader = Instance.new("TextLabel")
drawbackHeader.Size = UDim2.new(1, -30, 0, 25)
drawbackHeader.Position = UDim2.new(0, 15, 0, 250)
drawbackHeader.BackgroundTransparency = 1
drawbackHeader.Text = "DRAWBACK:"
drawbackHeader.TextColor3 = Color3.fromRGB(255, 100, 100)
drawbackHeader.Font = Enum.Font.GothamBold
drawbackHeader.TextSize = 16
drawbackHeader.TextXAlignment = Enum.TextXAlignment.Left
drawbackHeader.Parent = frame

local drawbackText = Instance.new("TextLabel")
drawbackText.Size = UDim2.new(1, -30, 0, 50)
drawbackText.Position = UDim2.new(0, 15, 0, 275)
drawbackText.BackgroundTransparency = 1
drawbackText.Text = "Drawback text..."
drawbackText.TextColor3 = Color3.fromRGB(255, 255, 255)
drawbackText.Font = Enum.Font.Gotham
drawbackText.TextSize = 14
drawbackText.TextWrapped = true
drawbackText.TextXAlignment = Enum.TextXAlignment.Left
drawbackText.Parent = frame

-- Ability
local abilityText = Instance.new("TextLabel")
abilityText.Size = UDim2.new(1, -30, 0, 30)
abilityText.Position = UDim2.new(0, 15, 0, 340)
abilityText.BackgroundTransparency = 1
abilityText.Text = "Ability: ..."
abilityText.TextColor3 = Color3.fromRGB(255, 255, 255)
abilityText.Font = Enum.Font.GothamBold
abilityText.TextSize = 16
abilityText.Parent = frame

-- Sign button
local signBtn = Instance.new("TextButton")
signBtn.Size = UDim2.new(0, 150, 0, 45)
signBtn.Position = UDim2.new(0, 30, 1, -65)
signBtn.BackgroundColor3 = Color3.fromRGB(255, 100, 50)
signBtn.Text = "SIGN"
signBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
signBtn.Font = Enum.Font.GothamBlack
signBtn.TextSize = 18
signBtn.Parent = frame

local signCorner = Instance.new("UICorner")
signCorner.CornerRadius = UDim.new(0, 8)
signCorner.Parent = signBtn

-- Decline button
local declineBtn = Instance.new("TextButton")
declineBtn.Size = UDim2.new(0, 150, 0, 45)
declineBtn.Position = UDim2.new(1, -180, 1, -65)
declineBtn.BackgroundColor3 = Color3.fromRGB(60, 60, 70)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 18
declineBtn.Parent = frame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 8)
declineCorner.Parent = declineBtn

-- Current spirit tracking
local currentSpirit = nil

-- Function to show UI
local function ShowUI(spiritKey, data)
	print("Showing UI for " .. tostring(spiritKey))
	currentSpirit = spiritKey
	
	-- Update text
	spiritName.Text = data.name:upper()
	desc.Text = data.description
	strengthText.Text = data.strength
	drawbackText.Text = data.drawback
	abilityText.Text = "Ability: " .. data.ability .. " (" .. data.damage .. " DMG)"
	
	-- Update colors
	stroke.Color = data.color
	signBtn.BackgroundColor3 = data.color
	spiritName.TextColor3 = data.color
	
	-- Show
	backdrop.Visible = true
	frame.Visible = true
end

-- Function to hide UI
local function HideUI()
	backdrop.Visible = false
	frame.Visible = false
	currentSpirit = nil
end

-- Listen for server event
ShowContract.OnClientEvent:Connect(function(spiritKey, data)
	print("Received ShowContract event for " .. tostring(spiritKey))
	ShowUI(spiritKey, data)
end)

-- Sign button clicked
signBtn.MouseButton1Click:Connect(function()
	if currentSpirit then
		print("Signing contract for " .. currentSpirit)
		SignContract:FireServer(currentSpirit)
		HideUI()
	end
end)

-- Decline button clicked
declineBtn.MouseButton1Click:Connect(function()
	HideUI()
end)

print("Client ready - UI created, waiting for server events")