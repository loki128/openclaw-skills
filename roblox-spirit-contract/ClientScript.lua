-- Client UI for Spirit Contract v4 - COMPLETE
-- Place this in StarterPlayerScripts as a LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Get remotes
local Remotes = ReplicatedStorage:WaitForChild("SpiritRemotes")
local ShowContract = Remotes:WaitForChild("ShowContract")
local SignContract = Remotes:WaitForChild("SignContract")

-- Create main UI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "SpiritContractUI"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
screenGui.Parent = playerGui

-- Dark backdrop
local backdrop = Instance.new("Frame")
backdrop.Name = "Backdrop"
backdrop.Size = UDim2.new(1, 0, 1, 0)
backdrop.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
backdrop.BackgroundTransparency = 1
backdrop.Visible = false
backdrop.Parent = screenGui

-- Main contract frame
local contractFrame = Instance.new("Frame")
contractFrame.Name = "ContractFrame"
contractFrame.Size = UDim2.new(0, 500, 0, 600)
contractFrame.Position = UDim2.new(0.5, -250, 0.5, -300)
contractFrame.BackgroundColor3 = Color3.fromRGB(12, 12, 16)
contractFrame.BorderSizePixel = 0
contractFrame.Visible = false
contractFrame.Parent = screenGui

-- Corner radius
local frameCorner = Instance.new("UICorner")
frameCorner.CornerRadius = UDim.new(0, 16)
frameCorner.Parent = contractFrame

-- Glow border
local frameStroke = Instance.new("UIStroke")
frameStroke.Color = Color3.fromRGB(255, 100, 50)
frameStroke.Thickness = 3
frameStroke.Parent = contractFrame

-- Glow effect
local glow = Instance.new("ImageLabel")
glow.Name = "Glow"
glow.Size = UDim2.new(1.4, 0, 1.4, 0)
glow.Position = UDim2.new(-0.2, 0, -0.2, 0)
glow.BackgroundTransparency = 1
-- glow.Image = "rbxassetid://1072804456" -- Optional glow image
-- glow.ImageColor3 = Color3.fromRGB(255, 100, 50)
glow.ImageTransparency = 0.8
glow.Parent = contractFrame

-- Header
local header = Instance.new("Frame")
header.Name = "Header"
header.Size = UDim2.new(1, 0, 0, 80)
header.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
header.BorderSizePixel = 0
header.Parent = contractFrame

local headerCorner = Instance.new("UICorner")
headerCorner.CornerRadius = UDim.new(0, 16)
headerCorner.Parent = header

-- Fix header corners
local headerFix = Instance.new("Frame")
headerFix.Size = UDim2.new(1, 0, 0, 20)
headerFix.Position = UDim2.new(0, 0, 1, -20)
headerFix.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
headerFix.BorderSizePixel = 0
headerFix.Parent = header

-- Title
local title = Instance.new("TextLabel")
title.Name = "Title"
title.Size = UDim2.new(1, 0, 0.6, 0)
title.Position = UDim2.new(0, 0, 0.1, 0)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 32
title.Parent = header

-- Subtitle
local subtitle = Instance.new("TextLabel")
subtitle.Name = "Subtitle"
subtitle.Size = UDim2.new(1, 0, 0.3, 0)
subtitle.Position = UDim2.new(0, 0, 0.6, 0)
subtitle.BackgroundTransparency = 1
subtitle.Text = "A binding pact of power and sacrifice"
subtitle.TextColor3 = Color3.fromRGB(150, 150, 150)
subtitle.Font = Enum.Font.Gotham
title.TextSize = 14
subtitle.Parent = header

-- Spirit name section
local nameSection = Instance.new("Frame")
nameSection.Name = "NameSection"
nameSection.Size = UDim2.new(1, -40, 0, 60)
nameSection.Position = UDim2.new(0, 20, 0, 100)
nameSection.BackgroundTransparency = 1
nameSection.Parent = contractFrame

local spiritName = Instance.new("TextLabel")
spiritName.Name = "SpiritName"
spiritName.Size = UDim2.new(1, 0, 0.7, 0)
spiritName.BackgroundTransparency = 1
spiritName.Text = "SPIRIT NAME"
spiritName.TextColor3 = Color3.fromRGB(255, 100, 50)
spiritName.Font = Enum.Font.GothamBlack
spiritName.TextSize = 36
spiritName.Parent = nameSection

local rarityLabel = Instance.new("TextLabel")
rarityLabel.Name = "Rarity"
rarityLabel.Size = UDim2.new(1, 0, 0.3, 0)
rarityLabel.Position = UDim2.new(0, 0, 0.7, 0)
rarityLabel.BackgroundTransparency = 1
rarityLabel.Text = "[COMMON]"
rarityLabel.TextColor3 = Color3.fromRGB(255, 215, 100)
rarityLabel.Font = Enum.Font.GothamBold
rarityLabel.TextSize = 16
rarityLabel.Parent = nameSection

-- Description
local descFrame = Instance.new("Frame")
descFrame.Name = "DescFrame"
descFrame.Size = UDim2.new(1, -40, 0, 60)
descFrame.Position = UDim2.new(0, 20, 0, 170)
descFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
descFrame.BorderSizePixel = 0
descFrame.Parent = contractFrame

local descCorner = Instance.new("UICorner")
descCorner.CornerRadius = UDim.new(0, 8)
descCorner.Parent = descFrame

local description = Instance.new("TextLabel")
description.Name = "Description"
description.Size = UDim2.new(1, -20, 1, -20)
description.Position = UDim2.new(0, 10, 0, 10)
description.BackgroundTransparency = 1
description.Text = "Spirit description goes here..."
description.TextColor3 = Color3.fromRGB(200, 200, 200)
description.Font = Enum.Font.Gotham
description.TextSize = 14
description.TextWrapped = true
description.TextXAlignment = Enum.TextXAlignment.Left
description.Parent = descFrame

-- Strength section
local strengthFrame = Instance.new("Frame")
strengthFrame.Name = "StrengthFrame"
strengthFrame.Size = UDim2.new(1, -40, 0, 100)
strengthFrame.Position = UDim2.new(0, 20, 0, 245)
strengthFrame.BackgroundColor3 = Color3.fromRGB(15, 35, 20)
strengthFrame.BorderSizePixel = 0
strengthFrame.Parent = contractFrame

local strengthCorner = Instance.new("UICorner")
strengthCorner.CornerRadius = UDim.new(0, 8)
strengthCorner.Parent = strengthFrame

local strengthHeader = Instance.new("TextLabel")
strengthHeader.Name = "StrengthHeader"
strengthHeader.Size = UDim2.new(1, -20, 0, 30)
strengthHeader.Position = UDim2.new(0, 10, 0, 10)
strengthHeader.BackgroundTransparency = 1
strengthHeader.Text = "✓ STRENGTH"
strengthHeader.TextColor3 = Color3.fromRGB(100, 255, 100)
strengthHeader.Font = Enum.Font.GothamBlack
strengthHeader.TextSize = 18
strengthHeader.TextXAlignment = Enum.TextXAlignment.Left
strengthHeader.Parent = strengthFrame

local strengthText = Instance.new("TextLabel")
strengthText.Name = "StrengthText"
strengthText.Size = UDim2.new(1, -20, 0, 50)
strengthText.Position = UDim2.new(0, 10, 0, 40)
strengthText.BackgroundTransparency = 1
strengthText.Text = "Strength description..."
strengthText.TextColor3 = Color3.fromRGB(255, 255, 255)
strengthText.Font = Enum.Font.Gotham
strengthText.TextSize = 15
strengthText.TextWrapped = true
strengthText.TextXAlignment = Enum.TextXAlignment.Left
strengthText.Parent = strengthFrame

-- Drawback section
local drawbackFrame = Instance.new("Frame")
drawbackFrame.Name = "DrawbackFrame"
drawbackFrame.Size = UDim2.new(1, -40, 0, 100)
drawbackFrame.Position = UDim2.new(0, 20, 0, 360)
drawbackFrame.BackgroundColor3 = Color3.fromRGB(35, 15, 15)
drawbackFrame.BorderSizePixel = 0
drawbackFrame.Parent = contractFrame

local drawbackCorner = Instance.new("UICorner")
drawbackCorner.CornerRadius = UDim.new(0, 8)
drawbackCorner.Parent = drawbackFrame

local drawbackHeader = Instance.new("TextLabel")
drawbackHeader.Name = "DrawbackHeader"
drawbackHeader.Size = UDim2.new(1, -20, 0, 30)
drawbackHeader.Position = UDim2.new(0, 10, 0, 10)
drawbackHeader.BackgroundTransparency = 1
drawbackHeader.Text = "✗ DRAWBACK"
drawbackHeader.TextColor3 = Color3.fromRGB(255, 100, 100)
drawbackHeader.Font = Enum.Font.GothamBlack
drawbackHeader.TextSize = 18
drawbackHeader.TextXAlignment = Enum.TextXAlignment.Left
drawbackHeader.Parent = drawbackFrame

local drawbackText = Instance.new("TextLabel")
drawbackText.Name = "DrawbackText"
drawbackText.Size = UDim2.new(1, -20, 0, 50)
drawbackText.Position = UDim2.new(0, 10, 0, 40)
drawbackText.BackgroundTransparency = 1
drawbackText.Text = "Drawback description..."
drawbackText.TextColor3 = Color3.fromRGB(255, 255, 255)
drawbackText.Font = Enum.Font.Gotham
drawbackText.TextSize = 15
drawbackText.TextWrapped = true
drawbackText.TextXAlignment = Enum.TextXAlignment.Left
drawbackText.Parent = drawbackFrame

-- Ability info
local abilityFrame = Instance.new("Frame")
abilityFrame.Name = "AbilityFrame"
abilityFrame.Size = UDim2.new(1, -40, 0, 50)
abilityFrame.Position = UDim2.new(0, 20, 0, 475)
abilityFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
abilityFrame.BorderSizePixel = 0
abilityFrame.Parent = contractFrame

local abilityCorner = Instance.new("UICorner")
abilityCorner.CornerRadius = UDim.new(0, 8)
abilityCorner.Parent = abilityFrame

local abilityLabel = Instance.new("TextLabel")
abilityLabel.Name = "AbilityLabel"
abilityLabel.Size = UDim2.new(0.3, 0, 1, 0)
abilityLabel.Position = UDim2.new(0, 15, 0, 0)
abilityLabel.BackgroundTransparency = 1
abilityLabel.Text = "ABILITY:"
abilityLabel.TextColor3 = Color3.fromRGB(150, 150, 150)
abilityLabel.Font = Enum.Font.GothamBold
abilityLabel.TextSize = 14
abilityLabel.TextXAlignment = Enum.TextXAlignment.Left
abilityLabel.Parent = abilityFrame

local abilityName = Instance.new("TextLabel")
abilityName.Name = "AbilityName"
abilityName.Size = UDim2.new(0.4, 0, 1, 0)
abilityName.Position = UDim2.new(0.3, 10, 0, 0)
abilityName.BackgroundTransparency = 1
abilityName.Text = "Fireball"
abilityName.TextColor3 = Color3.fromRGB(255, 255, 255)
abilityName.Font = Enum.Font.GothamBold
abilityName.TextSize = 18
abilityName.TextXAlignment = Enum.TextXAlignment.Left
abilityName.Parent = abilityFrame

local damageLabel = Instance.new("TextLabel")
damageLabel.Name = "DamageLabel"
damageLabel.Size = UDim2.new(0.3, -15, 1, 0)
damageLabel.Position = UDim2.new(0.7, 0, 0, 0)
damageLabel.BackgroundTransparency = 1
damageLabel.Text = "25 DMG"
damageLabel.TextColor3 = Color3.fromRGB(255, 100, 100)
damageLabel.Font = Enum.Font.GothamBlack
damageLabel.TextSize = 18
damageLabel.TextXAlignment = Enum.TextXAlignment.Right
damageLabel.Parent = abilityFrame

-- Buttons frame
local buttonsFrame = Instance.new("Frame")
buttonsFrame.Name = "Buttons"
buttonsFrame.Size = UDim2.new(1, -40, 0, 50)
buttonsFrame.Position = UDim2.new(0, 20, 0, 540)
buttonsFrame.BackgroundTransparency = 1
buttonsFrame.Parent = contractFrame

-- Sign button
local signButton = Instance.new("TextButton")
signButton.Name = "SignButton"
signButton.Size = UDim2.new(0.48, 0, 1, 0)
signButton.BackgroundColor3 = Color3.fromRGB(255, 100, 50)
signButton.Text = "SIGN CONTRACT"
signButton.TextColor3 = Color3.fromRGB(255, 255, 255)
signButton.Font = Enum.Font.GothamBlack
signButton.TextSize = 18
signButton.Parent = buttonsFrame

local signCorner = Instance.new("UICorner")
signCorner.CornerRadius = UDim.new(0, 10)
signCorner.Parent = signButton

-- Decline button
local declineButton = Instance.new("TextButton")
declineButton.Name = "DeclineButton"
declineButton.Size = UDim2.new(0.48, 0, 1, 0)
declineButton.Position = UDim2.new(0.52, 0, 0, 0)
declineButton.BackgroundColor3 = Color3.fromRGB(50, 50, 60)
declineButton.Text = "DECLINE"
declineButton.TextColor3 = Color3.fromRGB(255, 255, 255)
declineButton.Font = Enum.Font.GothamBold
declineButton.TextSize = 18
declineButton.Parent = buttonsFrame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 10)
declineCorner.Parent = declineButton

-- Current spirit data
local currentSpirit = nil
local currentData = nil

-- Show contract function
local function ShowContractUI(spiritKey, spiritData)
	currentSpirit = spiritKey
	currentData = spiritData
	
	-- Update text
	spiritName.Text = spiritData.name:upper()
	rarityLabel.Text = "[" .. spiritData.rarity:upper() .. "]"
	description.Text = spiritData.description
	strengthText.Text = spiritData.strength
	drawbackText.Text = spiritData.drawback
	abilityName.Text = spiritData.ability:upper()
	damageLabel.Text = spiritData.damage .. " DMG"
	
	-- Update colors
	frameStroke.Color = spiritData.color
	signButton.BackgroundColor3 = spiritData.color
	spiritName.TextColor3 = spiritData.glowColor
	
	-- Show UI with animation
	backdrop.Visible = true
	backdrop.BackgroundTransparency = 1
	contractFrame.Visible = true
	contractFrame.Position = UDim2.new(0.5, -250, 0.5, -200)
	contractFrame.BackgroundTransparency = 0.1
	
	-- Animate in
	TweenService:Create(backdrop, TweenInfo.new(0.3), {BackgroundTransparency = 0.6}):Play()
	TweenService:Create(contractFrame, TweenInfo.new(0.4, Enum.EasingStyle.Back), {Position = UDim2.new(0.5, -250, 0.5, -300)}):Play()
end

-- Hide contract function
local function HideContractUI()
	TweenService:Create(contractFrame, TweenInfo.new(0.2), {Position = UDim2.new(0.5, -250, 0.5, -200)}):Play()
	TweenService:Create(backdrop, TweenInfo.new(0.2), {BackgroundTransparency = 1}):Play()
	
	wait(0.2)
	backdrop.Visible = false
	contractFrame.Visible = false
	currentSpirit = nil
	currentData = nil
end

-- Listen for server
ShowContract.OnClientEvent:Connect(function(spiritKey, spiritData)
	ShowContractUI(spiritKey, spiritData)
end)

-- Sign button
signButton.MouseButton1Click:Connect(function()
	if currentSpirit then
		SignContract:FireServer(currentSpirit)
		HideContractUI()
	end
end)

-- Decline button
declineButton.MouseButton1Click:Connect(function()
	HideContractUI()
end)

-- Close on backdrop click
backdrop.InputBegan:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.MouseButton1 then
		HideContractUI()
	end
end)

-- Close on Escape key
local UserInputService = game:GetService("UserInputService")
UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if not gameProcessed and input.KeyCode == Enum.KeyCode.Escape then
		if contractFrame.Visible then
			HideContractUI()
		end
	end
end)

print("=== Spirit Contract Client UI Loaded ===")